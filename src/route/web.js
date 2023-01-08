import express from "express";
import homeController from "../controller/homeController";
let router = express.Router();

const initWebRoute = (app) => {
    router.get('/',homeController.getHomepage);
      
    router.get('/home', (req, res) => {
        res.send(`Welcome Home!`)
    })
    // can set something prefix
    return app.use("/nodebase", router)
}

export default initWebRoute;