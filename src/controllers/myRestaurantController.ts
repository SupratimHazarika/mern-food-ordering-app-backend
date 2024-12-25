import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from 'cloudinary'; 
import mongoose from "mongoose";

const createMyRestaurant = async (req: Request, res: Response) => {
    try {
        const existingRestaurant = await Restaurant.findOne({user: req.userId});

        if(existingRestaurant){
            res.sendStatus(409).json({message: "Restaurant already exists"})
            return;
        }

        const imageUrl = await uploadImage(req.file as Express.Multer.File)
        const restaurant = new Restaurant(req.body);
        restaurant.imageUrl = imageUrl;
        restaurant.lastUpdated = new Date();
        restaurant.user = new mongoose.Types.ObjectId(req.userId);
        await restaurant.save();

        res.status(201).send(restaurant);
    } catch (error) {
        console.log(error);
        res.sendStatus(500).json({message: "Something went wrong"});
    }
}

const getMyRestaurant = async (req:Request, res: Response) => {
    try {
        const restaurant = await Restaurant.findOne({ user: req.userId });
        if(!restaurant){
            res.sendStatus(404).json({ message: "No records for restaurant found"});
            return;
        }
        res.json(restaurant);
    } catch (error) {
        console.log(error);
        res.sendStatus(500).json({ message: "Error fetching restaurant"});
    }
}

const updateMyRestaurant = async (req: Request, res: Response) => {
    try {
        const myRestaurant = await Restaurant.findOne({ user: req.userId});
        if(!myRestaurant){
            res.sendStatus(404).json({ message: "No records for restaurant found"});
            return;
        }
        const reqBody = req.body;
        myRestaurant.restaurantName = reqBody.restaurantName;
        myRestaurant.city = reqBody.city;
        myRestaurant.country = reqBody.country;
        myRestaurant.deliveryPrice = reqBody.deliveryPrice;
        myRestaurant.estimatedDeliverTime = reqBody.estimatedDeliverTime;
        myRestaurant.cuisins = reqBody.cuisins;
        myRestaurant.menuItems = reqBody.menuItems;
        myRestaurant.lastUpdated = new Date();

        if(req.file){
            myRestaurant.imageUrl = await uploadImage(req.file);
        }

        await myRestaurant.save();
        res.status(200).send(myRestaurant)
        
    } catch (error) {
        console.log(error);
        res.sendStatus(500).json({ message: "Something went wrong"});
    }
}

const uploadImage = async (file: Express.Multer.File) => {
    const image = file;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
    return(uploadResponse.url);
}

export default {
    createMyRestaurant,
    getMyRestaurant,
    updateMyRestaurant
}