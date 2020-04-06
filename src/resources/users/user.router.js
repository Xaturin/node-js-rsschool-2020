const router = require('express').Router();
const User = require('./user.model');
const userService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await userService.getAll();
  await res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const user = await userService.get(req.params.id);
    res.status(200).send(User.toResponse(user));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    await userService.remove(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    return next(err);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const user = await userService.save(User.fromRequest(req.body));
    res.status(200).send(User.toResponse(user));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const user = await userService.update(
      req.params.id,
      User.fromRequest(req.body)
    );
    res.status(200).send(User.toResponse(user));
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
