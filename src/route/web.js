import express from "express";
import homeController from "../controller/homeController";
let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage);
    router.get('/detail/user/:id', homeController.getDetailPage);
    router.post('/create-user', homeController.createUser);
      
    router.get('/home', (req, res) => {
        res.send(`Welcome Home!`)
    })
    // can set something prefix
    return app.use("/", router)
}

export default initWebRoute;