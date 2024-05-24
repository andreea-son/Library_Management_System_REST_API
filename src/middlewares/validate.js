import httpError from "../utils/httpError.js";

const validate = (schemas) => (req, res, next) => {
  if (schemas.params) {
    const paramValidation = schemas.params.validate(req.params);
    if (paramValidation.error) {
        return next(new httpError(400, paramValidation.error.details[0].message));
    }
  }

  if (schemas.body) {
    const bodyValidation = schemas.body.validate(req.body);
    if (bodyValidation.error) {
        return next(new httpError(400, bodyValidation.error.details[0].message));
    }
  }

  if (schemas.file && req.file) {
    const fileValidation = schemas.file.validate({
      filename: req.file.filename,
      mimetype: req.file.mimetype,
      size: req.file.size
    });
    if (fileValidation.error) {
        return next(new httpError(400, fileValidation.error.details[0].message));
    }
  }

  if (schemas.query) {
    const queryValidation = schemas.query.validate(req.query);
    if (queryValidation.error) {
        return next(new httpError(400, queryValidation.error.details[0].message));
    }
  }

  next();
};

export default validate;
