const express = require('express');
const router = express.Router();
const multer = require('multer');
const { cloudinary } = require('./cloudinary');
connection = require('../../conf'); 

   const upload= multer({ storage: multer.diskStorage({}) ,
  fileFilter: (req, file, cb) => {
  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
  cb(null, true);
  } else {
  cb(null, false);
  return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
  }}).array('file')

 
  router.post('/upload_image',upload, async (req, res) => {
   const fileObj = [];
   const files=req.files.map(e=>e.path)
   fileObj.push(files)
  for (let i = 0; i < fileObj[0].length; i++) {
    await cloudinary.uploader.upload(fileObj[0][i],function (err, result){
      if(err){
        console.log(err);
      }
      else{
         connection.query('INSERT pictures SET image = ? ', result.secure_url, function(er,results) {
        if (er) {
          console.log(err);
        } else {
          console.log(results);
        }
        })
        
      }
    })
    .catch((err) => err)

  }



})




module.exports = router;