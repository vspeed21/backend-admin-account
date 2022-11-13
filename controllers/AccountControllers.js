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

export const getAccounts = async (req, res) => {
  const accounts = await Account.find().where('admin').equals(req.admin);
  res.json(accounts);
}

export const updateAcc = async (req, res) => {
  const { id } = req.params;
  const { name, screen, pin, card, deadline} = req.body;

  const account = await Account.findById(id);

  if(!account) {
    return res.status(404).json({msg: "NOT FOUND"});
  }

  if(account.admin._id.toString() !== req.admin._id.toString()) {
    return res.json({msg: "Accion no valida"})
  }
  
  try {
    account.name = name || account.name;
    account.screen = screen || account.screen;
    account.pin = pin || account.pin;
    account.card = card || account.card;
    account.deadline = deadline || account.deadline;

    await account.save();

    res.json({msg: "Modificado correctamente"});

  } catch (error) {
    console.log(error);
  }
  
}