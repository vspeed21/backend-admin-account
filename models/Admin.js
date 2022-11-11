import mongoose from "mongoose";

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
    default: null,
  },
  confirmed:{
    type: Boolean,
    default: false,
  }
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;