import Account from "../models/Account.js";

export const addAccount = async (req, res) => {
  const account = new Account(req.body);
  account.admin = req.admin._id;

  try {
    await account.save();
    res.json({msg: 'Cuenta agregada correctamente'});
  } catch (error) {
    console.log(error);
  }
}