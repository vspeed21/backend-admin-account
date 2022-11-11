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