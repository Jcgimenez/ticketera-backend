module.exports = (schema) => async (req, res, next) => {
  try {
    const payload = {
      body: req.body,
      params: req.params,
      query: req.query
    };
    const value = await schema.validateAsync(payload, { abortEarly: false, allowUnknown: true });
    req.body = value.body;
    req.params = value.params;
    req.query = value.query;
    next();
  } catch (err) {
    err.status = 400;
    err.details = err.details?.map(d => ({ message: d.message, path: d.path })) || err.message;
    next(err);
  }
};

