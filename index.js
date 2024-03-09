const { S3Client } = require('@aws-sdk/client-s3');
const express = require('express');
const multer = require('multer');
const multers3 = require('multer-s3');
const PORT = 8080;
const app = express();

const s3 = new S3Client()

const upload = multer({
    storage : multers3({
        s3 : s3,
        bucket : 'cyclic-dark-gray-worm-robe-eu-west-1',
        metadata : function(req,file,cb){
            cb(null, {fieldName: file.fieldname});
        },
        key : function(req,file,cb){
            cb(null,Date.now().toString());
        }
    })
});



app.post('/upload',upload.single('avatar'),(req,res)=>{
    res.status(200).json({msg : "file uploaded successfully",file : req.file});
})

app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
})

