
import { PdfReader } from "pdfreader";

export const checkFile = async (filePath) => {
    let data = []
    const reader = new PdfReader();
    const result  =  await new Promise((resolve, reject) => {
        reader.parseFileItems(filePath, (err, item) => {
            if (err) console.error("error:", err);
        else if (!item){
            resolve(data[data.length - 1])
        }
        else if (item.text){
            data.push(item.text)
            
            }
        });
    });
    return result
}


