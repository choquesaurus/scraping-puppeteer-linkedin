import fs from 'fs';
import path from 'path';
import {S3} from 'aws-sdk';
const {accessKeyId,secretAccessKey}=process.env;
const s3 = new S3({
    //Access Token del usuario IAM
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region:'us-east-2'
    //signatureVersion:'v4'
});
function RealizarOperacion(data,operacion){
switch(operacion){
    case 'archivo':
        SaveInFile(data);
        break;
    case 'guardars3':
        GuardarS3(data);
        break;
}
}

function GuardarS3(data){
    const params={
        Key:'scraping.txt', 
        Bucket:'bucket000upload',
        Body:JSON.stringify(data)
    }
    s3.putObject(params,(err,data)=>{
        
        if(err)console.log(err)
        console.log('se agrego correctamente :D',data)
    })
}
function SaveInFile(data){
    let writeStream=fs.createWriteStream(path.join(__dirname,'../write/texto.txt'));    
    data.forEach(element => {
        writeStream.write(`
            nombre:${element.nombre}\n
            urlimage:${element.urlimage}\n
            ocupacion:${element.ocupacion}
        `)        
    });
    console.log('Se agrego al archivo correctamente  al archivo txt :D')
    //writeStream.write('hellodweiojqowje');
    writeStream.close();
}
export default RealizarOperacion;
//exports.RealizarOperacion=RealizarOperacion;
//  exports.Sumar=Sumar;
//module.exports={}