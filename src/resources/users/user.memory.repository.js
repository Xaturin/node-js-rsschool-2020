const DataBase = require('../../utils/database');
const TABLE_NAME = 'Users';

const getAll = async () => {
  return DataBase.getAll(TABLE_NAME);
};

const get = async id => {
  const user = await DataBase.getById(TABLE_NAME, id);
  return user;
};

const remove = async id => {
  await DataBase.remove(TABLE_NAME, id);
};

const save = async user => {
  return DataBase.save(TABLE_NAME, user);
};

const update = async (id, user) => {
  const entity = await DataBase.update(TABLE_NAME, id, user);
  return entity;
};

module.exports = { getAll, get, remove, save, update };
