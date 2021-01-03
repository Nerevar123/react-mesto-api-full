const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new Error('cardNotFound'))
    .then((data) => {
      // eslint-disable-next-line eqeqeq
      if (data.owner != req.user._id) {
        throw new Error('forbidden');
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then((card) => res.send(card));
    })
    .catch(next);
};

const updateLike = (req, res, next, method) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { [method]: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('cardNotFound'))
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.putLike = (req, res, next) => updateLike(req, res, next, '$addToSet');

module.exports.deleteLike = (req, res, next) => updateLike(req, res, next, '$pull');
