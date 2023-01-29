
import express from "express";
import userApiController from '../controller/userApiController'
let router = express.Router();

const initAPIRoute = (app) => {
    // method GET -> read data  
    router.get('/users', userApiController.getAllUsers);
    router.post('/create-user', userApiController.createNewUser);
    router.put('/update-user', userApiController.updateUser);
    router.delete('/delete-user/:id', userApiController.deleteUser);

    // can set something prefix
    return app.use("/api/v1/", router)
}

export default initAPIRoute;