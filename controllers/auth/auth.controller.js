const register = async (req, res, next) => res.redirect('/api/productos');
const login = async (req, res, next) => res.redirect('/api/productos');

module.exports = {
  login,
  register,
}