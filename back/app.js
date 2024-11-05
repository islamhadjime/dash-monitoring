import express from 'express'
import sequelize from './config/db.js'
import cors from 'cors'
import dotenv from 'dotenv'
import authRouter from './routes/auth.router.js'
import schoolRouter from './routes/school.router.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())



app.use('/api/auth', authRouter)
app.use('/api/school', schoolRouter)


const main = () =>{
    sequelize.sync({force:true})
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    })
}
main()