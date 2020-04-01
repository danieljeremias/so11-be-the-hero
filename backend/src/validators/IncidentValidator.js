const { celebrate, Segments, Joi } = require('celebrate');

const IncidentValidatorDelete = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
});

const IncidentValidatorGet = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number()
  })
});

const IncidentValidatorPost = celebrate({
  [Segments.HEADERS]: Joi.object()
    .keys({
      authorization: Joi.string().required()
    })
    .unknown(),
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required()
  })
});

module.exports = {
  IncidentValidatorDelete,
  IncidentValidatorGet,
  IncidentValidatorPost
};
