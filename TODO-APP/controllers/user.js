import userModel from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res, next)=> {
  
  try{
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const newUser = new userModel({ ...req.body, password: hash });

      await newUser.save();

      const token = jwt.sign({id: newUser._id}, process.env.JWT);

      const { password, ...othersData} = newUser._doc;
      res.cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json(othersData);
    }catch (err) {
      next(err)

  }
};

export const login = async(req, res, next)=> {
  
  try{
      const user = await userModel.findOne({email: req.body.email})

      if (!user) {
        return res.status(404).json({ message: "User Not found" });
      }

      const isCorrect = await bcrypt.compare(req.body.password, user.password);

      if(!isCorrect){
        return res.status(400).json({ message: "Incorrect Password" });
      } 

      const token = jwt.sign({id: user._id}, process.env.JWT);
      const {password, ...othersData} = user._doc;
      res.cookie("access_token", token, { httpOnly: true}).status(200).json(othersData);
    }catch (err) { 
      next(err);

  }

};

export const getUser = async(req, res, next)=>{
  try{
      const user = await userModel.findById(req.params.id);
      res.status(200).json(user);
  }catch(err){
      next(err);
  }
};
