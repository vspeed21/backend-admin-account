import generateJWT from "../helpers/generarJWT.js";
import generateToken from "../helpers/generateToken.js";
import Admin from "../models/Admin.js"

export const signUp = async (req, res) => {
  const { email } = req.body;

  const adminExists = await Admin.findOne({email});
  
  if(adminExists) {
    const error = new Error("Cuenta ya registrada");
    return res.json({msg: error.message});
  }

  try {
    const admin = new Admin(req.body);
    await admin.save();

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
    return res.json({msg: error.message});
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
    return res.json({msg: error.message});
  }

  try {
    admin.token = generateToken();
    await admin.save();

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
    return res.json({msg: error.message});
  }
}

export const savePassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  
  const admin = await Admin.findOne({token});

  if(!admin) {
    const error = new Error("Hubo un error con el enlace");
    return res.json({msg: error.message});
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
    return res.json({msg: error.message});
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
    return res.json({msg: error.message});
  }
}