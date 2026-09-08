import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiErrors} from "../utils/ApiErrors.js"
import {User} from "../models/users.model.js"
import {uploadCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser=asyncHandler(async (req,res)=>{
    const {fullName,userName,email,password}=req.body;
    console.log("Email is: ",email);
    //validation
    //we can validate for many more things
    if(
        [fullName,userName,email,password].some((item)=>{
            item?.trim()===""
        })
    ){
        throw new ApiErrors(400, "All fields are compulsory!")
    }

    //check if user Exists
    const existedUser=User.findOne({
        $or:[{userName},{email}]
    })
    if(existedUser)throw new ApiErrors(409,"User already exists")

    //now image 
    const avatarLocalPath=req.files?.avatar[0]?.path
    const coverImgLocalPath=req.files?.coverImage[0]?.path

    if(!avatarLocalPath)throw new ApiErrors(400,"Avatar is required!");

    const avatar=await uploadCloudinary(avatarLocalPath) 
    const coverImage=await uploadCloudinary(coverImgLocalPath) 

    if(!avatar)throw new ApiErrors(400,"Avatar is required");

   const user=await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        userName:userName.toLowerCase()
    })

    const createdUser=User.findById(createdUser._id).select(
        "-password -refreshToken"
    )

    if(!createdUser)throw new ApiErrors(500,"Something went wrong while registering the User");

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User Registered Successfully")
    )

        


})
 
export{registerUser} 