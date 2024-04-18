const jwt = require('jsonwebtoken');
const MernSchema = require('../model/UserModel');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, userName: user.userName }, 'your_secret_key', { expiresIn: '1h' });
};

async function postLogin(req, res) {
  try {
    const { userName, password } = req.body;

    const user = await MernSchema.findOne({ userName });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const passCompare = password === user.password;

    if (passCompare) {
      const token = generateToken(user);
      return res.status(200).json({ success: true, token, userName });
    } else {
      return res.status(401).json({ msg: 'Incorrect credentials' });
    }
  } catch (err) {
    console.log({ error: 'Internal server error' });
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getReq(req, res) {
  try {
    const Data = await MernSchema.find().select('userName');

    if (Data.length === 0) {
      return res.status(404).json({ msg: 'Can not find users' });
    } else {
      return res.status(200).json(Data);
    }
  } catch (err) {
    console.log({ error: 'Internal server error' });
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  postLogin,
  getReq
};
