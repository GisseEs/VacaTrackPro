// controllers/auth.controller.js
const authService = require('../services/auth');
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
module.exports = { login };