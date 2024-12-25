import express from "express";
import multer from "multer";
import myRestaurantController from "../controllers/myRestaurantController";
import { validateMyRestaurantRequest } from "../middleware/validation";
import { jwtCheck, jwtParse } from "../middleware/auth";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 //5mb
    }
})

router.post(
    "/",
    upload.single("imageFile"),
    validateMyRestaurantRequest,
    jwtCheck,
    jwtParse,
    myRestaurantController.createMyRestaurant
);

router.get(
    "/",
    jwtCheck,
    jwtParse,
    myRestaurantController.getMyRestaurant
);

router.put(
    "/",
    upload.single("imageFile"),
    validateMyRestaurantRequest,
    jwtCheck,
    jwtParse,
    myRestaurantController.updateMyRestaurant
)

export default router;