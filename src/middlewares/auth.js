const jwt = require('../auth/jwt');

function auth(roles = []) {
  const allowed = Array.isArray(roles) ? roles : [roles];
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization || '';
      const [type, token] = authHeader.split(' ');
      if (type !== 'Bearer' || !token) {
        const err = new Error('Unauthorized');
        err.status = 401;
        throw err;
      }
      const payload = jwt.verify(token);
      req.user = { id: payload.sub, role: payload.role, email: payload.email, name: payload.name };
      if (allowed.length && !allowed.includes(req.user.role)) {
        const err = new Error('Forbidden');
        err.status = 403;
        throw err;
      }
      return next();
    } catch (e) {
      if (!e.status) e.status = 401;
      return next(e);
    }
  };
}

module.exports = auth;

