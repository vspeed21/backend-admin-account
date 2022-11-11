import mongoose from "mongoose";
import bcrypt from 'bcrypt';

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

adminSchema.pre('save', async function(next){
  if(!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

adminSchema.methods.checkPassword = async function(password){
  return await bcrypt.compare(password, this.password);
}

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;