module.exports = (err, req, res, next) => {
  const status = err.status || 500;
  const payload = {
    error: true,
    message: err.message || 'Internal Server Error'
  };
  if (err.details) payload.details = err.details;
  if (process.env.NODE_ENV !== 'production' && err.stack) payload.stack = err.stack;
  res.status(status).json(payload);
};

