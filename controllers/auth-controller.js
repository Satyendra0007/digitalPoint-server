const User = require("../models/User-model")

const signUp = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      res.status(400).json({ message: "Email Already Exists Kindly Login ! " })
    } else {
      const newUser = await User.create(req.body)
      res.status(200).json({ message: "Accout Created Successfully ", token: newUser.generateToken() })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Intenal Server Error !" })
  }
}


const logIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if ((user) && (await user?.validatePassword(req.body.password))) {
      res.status(200).json({ message: "Loged in SuccessFully ", token: user.generateToken() })
    }
    else {
      res.status(400).json({ message: "Invalid Email or Password " })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal Server Error " })
  }

}

const getUserData = async (req, res) => {
  try {
    const userData = await User.findOne({ email: req.userData.email })
    res.status(200).json(userData)
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" })
  }
}

module.exports = { logIn, signUp, getUserData }