const express = require('express');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, `${process.cwd()}/public/videos/`)
        },
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname.toLowerCase().split(' ').join('-'))
        }
      })


const upload_video = multer({ storage: storage ,
        fileFilter: (req, file, cb) => {
        if (file.mimetype == "video/mp4") {
        cb(null, true);
        } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
        }}).array('file')


router.post('/upload_video',function(req, res) {
  console.log("req====>",req.files); 
    upload_video(req,res, function (err) { 
       console.log("upload===>",req.files);  
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
          // A Multer error occurred when uploading.
        } else if (err) {
            return res.status(500).json(err)
          // An unknown error occurred when uploading.
        } 
        //multipl images
        if(req.files){
     const fileArray = [];
     const fileObj = [];
     const files=req.files.map(e=>e.filename)
      fileObj.push(files)
     for (let i = 0; i < fileObj[0].length; i++) {
      fileArray.push(`http://localhost:3000/public/videos/${fileObj[0][i]}`)
     }
     return res.json({file:fileArray});
        }
    
   
     })
  
  });

module.exports = router;
  