





import express from "express";
  import multer from "multer";
 import path from "path";

 import { dirname } from 'path';
 import { fileURLToPath } from 'url';

 const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
 const router = express.Router();




  const storage=multer.diskStorage({


 destination(req,file,cb){


  cb(null, path.resolve(__dirname, '../../uploads'));




 },


 filename(req,file,cb){

  cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);

 },






 });





 function checkfilestypes(file,cb){


 const filetypes=/jpeg|jpg|png/;

  const extname=filetypes.test(path.extname(file.originalname).toLowerCase())
 const mimetype=filetypes.test(file.mimetype)


if(extname&& mimetype){

 return cb(null,true)


 }else{

 cb('only images are allowed')



 }


  }





 const upload=multer({storage,fileFilter:function(req,file,cb){


 checkfilestypes(file,cb);






}})




router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded or invalid file type' });
  }

  // Safe and correct
  res.json({ image: `/uploads/${req.file.filename}` });
});



export default router;

