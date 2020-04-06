const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const boardService = require('./task.service');

router.route('/').get(async (req, res, next) => {
  try {
    const boards = await boardService.getAll(req.params.boardId);
    await res.json(boards);
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const board = await boardService.get(req.params.boardId, req.params.id);
    res.status(200).send(board);
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    await boardService.remove(req.params.boardId, req.params.id);
    res.sendStatus(200);
  } catch (err) {
    return next(err);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const board = await boardService.save(
      Task.fromRequest({ ...req.body, boardId: req.params.boardId })
    );
    res.status(200).send(board);
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const board = await boardService.update(
      Task.fromRequest({
        ...req.body,
        id: req.params.id,
        boardId: req.params.boardId
      })
    );
    res.status(200).send(board);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
