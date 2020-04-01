const { celebrate, Segments, Joi } = require('celebrate');

const ProfileValidator = celebrate({
  [Segments.HEADERS]: Joi.object()
    .keys({
      authorization: Joi.string().required()
    })
    .unknown()
});

module.exports = ProfileValidator;
