const express = require('express');
const multer = require('multer');
const PORT = 8080;
const app = express();
const upload = multer({dest : 'upload/'});



app.post('/upload',upload.single('avatar'),(req,res)=>{
    res.status(200).json({msg : "file uploaded successfully",file : req.file});
})

app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
})

