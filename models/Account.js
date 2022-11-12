import mongoose from 'mongoose';

const cuentaSchema = mongoose.Schema({
  name:{
    type: String,
    required: true,
    trim: true,
  },
  screen:{
    type: String,
    required: true,
    trim: true,
  },
  pin:{
    type: String,
    required: true,
    trim:true,
  },
  card:{
    type: String,
    required: true,
    trim: true,
  },
  deadline:{
    type: Date,
    default: Date.now(),
  },
  admin:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
  }
},{
  timestamps: true,
});

const Account = mongoose.model('accounts', cuentaSchema);

export default Account;