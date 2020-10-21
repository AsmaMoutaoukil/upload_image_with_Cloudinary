const express = require('express');
const multer = require('multer');
const router = express.Router();

// UPLOAD IMAGES //
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${process.cwd()}/public/images/`)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname.toLowerCase().split(' ').join('-'))
  }
})
const upload = multer({ storage: storage ,
  fileFilter: (req, file, cb) => {
  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
  cb(null, true);
  } else {
  cb(null, false);
  return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
  }}).array('file')
 
router.post('/upload_image',function(req, res) {
  upload(req,res, function (err) {  
      if (err instanceof multer.MulterError) {
          return res.status(500).json(err)
        // A Multer error occurred when uploading.
      } else if (err) {
          return res.status(500).json(err)
        // An unknown error occurred when uploading.
      } 
      //multipl images
      if(req.files){
        console.log(req.files);
        
   const fileArray = [];
   const fileObj = [];
   const files=req.files.map(e=>e.filename)
    fileObj.push(files)
   for (let i = 0; i < fileObj[0].length; i++) {
    fileArray.push(`http://localhost:3000/public/images/${fileObj[0][i]}`)
   }
   return res.json({file:fileArray});
      }
  
 
    })

});
              




 module.exports = router
