import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

class School extends Model {}

School.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    schoolName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    students:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    passed:{
        type:DataTypes.STRING, // Изменено с ARRAY на STRING
        allowNull:false,
        defaultValue: JSON.stringify([]) // Используем JSON-строку как значение по умолчанию
    },
    passedCount:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
    },
    idUser:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
    },
    timePassed:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:"00:00:00"
    }
}, {
    sequelize,
    modelName:"School"
})



export default School