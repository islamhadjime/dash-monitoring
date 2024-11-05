import express from 'express'

const router = express.Router()
import School from '../model/School.js'
import User from '../model/User.js'
import fs from 'fs'
import { checkAuth } from '../middleware/checkAuth.js'
import { checkRole } from '../middleware/checkRole.js'
import multer from 'multer'
import { uploadValidation } from '../validation.js'
const upload = multer({ dest: 'uploads/' });
import { checkFile } from '../utils/checkFile.js'

router.get('/', async (req, res) => {
    try {
        const schools = await School.findAll({
            attributes: ['id', 'schoolName', 'students','passedCount'],
        })
        res.status(200).json({schools})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
router.get('/endpoint', checkAuth, async (req, res) => {
    try {
        const id = req.userId
        let schoolName = ''
        const user = await User.findByPk(id,{
            attributes: ['name', 'email']
        })
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        if(id ==1){
            schoolName = await School.findAll({
                attributes: ['schoolName']
            })
        }else{
            schoolName = await School.findOne({
                where:{idUser:id},
                attributes: ['id','schoolName']
            })
        }
        if(!schoolName){
            return res.status(404).json({message:"School not found"})
        }
        res.status(200).json({message:{
            schoolName,
            user
        }})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
router.get('/:id', checkAuth, async (req, res) => {
    try {
        const id = req.params.id
        const school = await School.findByPk(id)
        res.status(200).json({message:school})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
router.post('/static-file', checkAuth, upload.array('pdfs', 200), uploadValidation, async (req, res) => {
    try {
        const files = req.files;
        const userId = req.userId;
        const school = await School.findByPk(userId);
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!school) {
            return res.status(404).json({ message: "School not found" });
        }

        // Get all passed data from all schools
        const allPassedData = await School.findAll({
            attributes: ['passed']
        });

        let allPassed = [];
        allPassedData.forEach(school => {
            if (school.dataValues.passed) {
                allPassed = allPassed.concat(JSON.parse(school.dataValues.passed));
            }
        });

        let passedUser = [];
        const passedData = await School.findOne({
            where: { idUser: userId },
            attributes: ['passed']
        });

        if (passedData && passedData.dataValues.passed) {
            passedUser = JSON.parse(passedData.dataValues.passed);
        }

        // Process files in parallel
        await Promise.all(files.map(async (file) => {
            try {
                const data = await checkFile(file.path);
                if (!allPassed.includes(data)) {
                    passedUser.push(data);
                    allPassed.push(data); // Add to global list to prevent duplicates
                } else {
                    console.log('File already exists in the system');
                }
            } catch (error) {
                console.log(error);
            } finally {
                fs.unlinkSync(file.path);
            }
        }));

        console.log(passedUser);
        await School.update({ passed: JSON.stringify(passedUser), passedCount: passedUser.length }, { where: { idUser: userId } });
        res.status(200).json({ message: "Success" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// create school ADMIN
router.post('/create-school', checkAuth,checkRole, async (req, res) => {
    try {
        const {schoolName, students,idUser} = req.body
        const user = await User.findByPk(idUser)
        if(!user){
            res.status(404).json({message:"User not found"})
        }
        const school = await School.create({schoolName, students,idUser})
        res.status(200).json({message:school})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

export default router