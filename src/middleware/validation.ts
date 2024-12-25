import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
}

export const validateMyUserRequest = [
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("addressLine1").isString().notEmpty().withMessage("addressLine1 must be a string"),
    body("city").isString().notEmpty().withMessage("City must be a string"),
    body("country").isString().notEmpty().withMessage("Country must be a string"),
    handleValidationErrors,
]

export const validateMyRestaurantRequest = [
    body("restaurantName").notEmpty().withMessage("Restaurant name is required"),
    body("city").notEmpty().withMessage("city name is required"),
    body("country").notEmpty().withMessage("country name is required"),
    body("deliveryPrice").isFloat({ min: 0 }).withMessage("Delivery price must be a positive number"),
    body("estimatedDeliverTime").isInt({ min: 0 }).withMessage("Estimated Delivery Time price must be a positive number"),
    body("cuisins").isArray().withMessage("Cuisins must be an array").not().isEmpty().withMessage("Cuisins array must not be empty"),
    body("menuItems").isArray().withMessage("Menu Items must be an array"),
    body("menuItems.*.name").notEmpty().withMessage("Menu item name is required"),
    body("menuItems.*.price").isFloat({ min: 0 })
        .withMessage("Menu item price is required and must be a positive number"),
    handleValidationErrors
]