import express from "express";
import homeController from "../controller/homeController";
import multer from "multer";
import path from "path";
var appRoot = require('app-root-path');
let router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log(">>> check appRoot: ", appRoot);
        cb(null, appRoot + '/src/public/images/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

let upload = multer({ storage: storage, fileFilter: imageFilter });

const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};


const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage);
    router.get('/detail/user/:id', homeController.getDetailPage);
    router.post('/create-user', homeController.createUser);
    router.get('/edit-user/:id', homeController.editUser);
    router.post('/update-user', homeController.updateUser);
    router.post('/delete-user', homeController.deleteUser);
    router.get('/upload', homeController.getUploadFilePage);
    router.post('/upload-profile-image', upload.single('profile_image') , homeController.handleUploadFile);
      
    router.get('/home', (req, res) => {
        res.send(`Welcome Home!`)
    })
    // can set something prefix
    return app.use("/", router)
}

export default initWebRoute;