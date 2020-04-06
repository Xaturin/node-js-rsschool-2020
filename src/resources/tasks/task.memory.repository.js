const DataBase = require('../../utils/database');
const TABLE_NAME = 'Tasks';

const getAll = async boardId => {
  return DataBase.getAll(TABLE_NAME).filter(task => task.boardId === boardId);
};

const get = async (boardId, id) => {
  const task = await DataBase.getById(TABLE_NAME, id);
  return task;
};

const remove = async (boardId, id) => {
  await DataBase.remove(TABLE_NAME, id);
};

const save = async task => {
  return DataBase.save(TABLE_NAME, task);
};

const update = async task => {
  await get(task.boardId, task.id);
  return DataBase.update(TABLE_NAME, task.id, task);
};

module.exports = { getAll, get, remove, save, update };
