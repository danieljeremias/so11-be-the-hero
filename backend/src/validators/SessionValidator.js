const { celebrate, Segments, Joi } = require('celebrate');

const SessionValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required()
  })
});

module.exports = SessionValidator;
