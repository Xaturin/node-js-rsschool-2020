const DataBase = require('../../utils/database');
const TABLE_NAME = 'Boards';

const getAll = async () => {
  return DataBase.getAll(TABLE_NAME);
};

const get = async id => {
  const board = await DataBase.getById(TABLE_NAME, id);
  return board;
};

const remove = async id => {
  await DataBase.remove(TABLE_NAME, id);
};

const save = async board => {
  return DataBase.save(TABLE_NAME, board);
};

const update = async (id, board) => {
  const entity = await DataBase.update(TABLE_NAME, id, board);
  return entity;
};

module.exports = { getAll, get, remove, save, update };
