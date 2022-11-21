import generateJWT from "../helpers/generarJWT.js";
import generateToken from "../helpers/generateToken.js";
import Admin from "../models/Admin.js";
import sendEmailSignUp from "../helpers/sendEmailSignUp.js";
import sendEmailForgotPassword from "../helpers/sendEmailForgotPasword.js";

export const signUp = async (req, res) => {
  const { email } = req.body;

  const adminExists = await Admin.findOne({email});
  
  if(adminExists) {
    const error = new Error("La cuenta ya fue registrada");
    return res.status(403).json({msg: error.message});
  }

  try {
    const admin = new Admin(req.body);
    const adminSave = await admin.save();

    sendEmailSignUp({
      nombre: adminSave.name,
      email,
      token: adminSave.token,
    });

    res.json({msg: 'Se ha enviado un correo para tu confirmar tu cuenta'});

  } catch (error) {
    console.log(error);
  }
}

export const confirmAcc = async (req, res) => {
  const { token } = req.params;
  
  const admin = await Admin.findOne({token});

  if(!admin) {
    const error = new Error("Hubo un error con el enlace");
    return res.status(404).json({msg: error.message});
  }

  try {
    admin.token = null;
    admin.confirmed = true;
    await admin.save();
    res.json({msg: 'Cuenta confirmada correctamente'});
  } catch (error) {
    console.log(error);
  }
}

export const forgotPasswordSendEmail = async (req, res) => {
  const { email } = req.body;

  const admin = await Admin.findOne({email});

  if(!admin) {
    const error = new Error("Cuenta no registrada aún");
    return res.status(404).json({msg: error.message});
  }

  try {
    admin.token = generateToken();
    const adminSave = await admin.save();

    sendEmailForgotPassword({
      nombre: admin.name,
      email,
      token: adminSave.token,
    })

    res.json({msg: "Se ha enviado un correo con las instrucciones"});
  } catch (error) {
    console.log(error);
  }
}

export const checkToken = async (req, res) => {
  const { token } = req.params;
  
  const admin = await Admin.findOne({token});

  if(admin) {
    res.send({msg: "Ingresa tu nueva contraseña"});
  }else{
    const error = new Error("Hubo un error con el enlace");
    return res.status(404).json({msg: error.message});
  }
}

export const savePassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  
  const admin = await Admin.findOne({token});

  if(!admin) {
    const error = new Error("Hubo un error con el enlace");
    return res.status(404).json({msg: error.message});
  }

  try {
    admin.token = null;
    admin.password = password;
    await admin.save();

    res.json({msg: 'Contraseña modificada correctamente'})
  } catch (error) {
    console.log(error);
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({email});

  if(!admin) {
    const error = new Error("Cuenta no registrada aún");
    return res.status(404).json({msg: error.message});
  }

  if(!admin.confirmed) {
    const error = new Error("Tu cuenta aún no ha sido confirmada");
    return res.json({msg: error.message});
  }

  if(await admin.checkPassword(password)) {
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateJWT(admin._id),
    });
  }else{
    const error = new Error("Contraseña incorrecta");
    return res.status(404).json({msg: error.message});
  }
}

//Priva requiests
export const getPerfil = (req, res) => {
  const { admin } = req;

  res.json(admin);
}

export const updateProfile = async (req, res) => {
  const { _id, name } = req.body;
  
  const admin = await Admin.findById(_id);

  if(!admin) {
    const error = new Error('Cuenta no encontrada');
    return res.status(404).json({msg: error.message});
  }

  try {
    admin.name = name || admin.name;
    await admin.save()

    res.json({msg: 'Datos modificados correctamente'});

  } catch (error) {
    console.log(error);
  }
}

export const changePassword = async (req, res) => {
  const { pwd_actual, pwd_nuevo }= req.body;
  const { _id } = req.admin;

  const admin = await Admin.findById(_id);

  if(!admin) {
    const error = new Error('Cuenta no encontrada');
    return res.status(404).json({msg: error.message});
  };

  if(!await admin.checkPassword(pwd_actual)) {
    const error = new Error("La contraseña actual es incorrecta");
    return res.status(404).json({msg: error.message});
  }

  try {
    admin.password = pwd_nuevo;
    await admin.save();

    res.json({msg: 'contraseña modificada correctamente'});
  } catch (error) {
    console.log(error);
  }
  
}