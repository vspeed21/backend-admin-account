import mongoose from "mongoose";
import generateToken from '../helpers/generateToken.js';

const adminSchema = mongoose.Schema({
  name:{
    type: String,
    required: true,
    trim: true,
  },
  email:{
    type: String,
    required: true,
    trim: true,
    unique:true,
  },
  password:{
    type: String,
    required: true,
    trim: true,
  },
  token:{
    type: String,
    default: generateToken(),
  },
  confirmed:{
    type: Boolean,
    default: false,
  }
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;