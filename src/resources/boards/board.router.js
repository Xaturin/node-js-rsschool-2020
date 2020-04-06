const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');

router.route('/').get(async (req, res, next) => {
  try {
    const boards = await boardService.getAll();
    await res.json(boards);
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const board = await boardService.get(req.params.id);
    res.status(200).send(board);
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    await boardService.remove(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    return next(err);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const board = await boardService.save(Board.fromRequest(req.body));
    res.status(200).send(board);
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const board = await boardService.update(Board.fromRequest(req.body));
    res.status(200).send(board);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
