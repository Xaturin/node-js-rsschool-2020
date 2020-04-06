const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const DataBase = {
  Users: [],
  Boards: [],
  Tasks: []
};

DataBase.Users.push(
  new User({
    name: 'Leonard Hofstadter',
    login: 'Leakey',
    password: 'SuperLeonard'
  })
);
DataBase.Users.push(
  new User({
    name: 'Penny Hofstadter',
    login: 'Slugger',
    password: '1234'
  })
);
DataBase.Users.push(
  new User({
    name: 'Sheldon Cooper',
    login: 'MoonPie',
    password: 'e=mc^2'
  })
);

const board = new Board({
  id: '19035db0-934c-4abc-96d7-9e547b2e0bb5',
  title: 'CalTech'
});
DataBase.Boards.push(board);
DataBase.Tasks.push(
  new Task({ boardId: board.id, userId: DataBase.Users[0].id }),
  new Task({ boardId: board.id, userId: DataBase.Users[1].id })
);

const getAll = tableName => {
  return DataBase[tableName];
};

const getById = (tableName, id) => {
  const row = DataBase[tableName].filter(item => item.id === id);

  if (!row.length) {
    throw new ErrorHandler(
      404,
      `Not found ${tableName.slice(
        0,
        tableName.length - 1
      )} with id ${id} in table ${tableName}`
    );
  }

  return row[0];
};

const remove = (tableName, id) => {
  const row = getById(tableName, id);
  if (row) {
    const index = DataBase[tableName].indexOf(row);
    DataBase[tableName].splice(index, 1);

    switch (tableName) {
      case 'Boards':
        DataBase.Tasks = DataBase.Tasks.filter(item => item.boardId !== id);
        break;
      case 'Users':
        DataBase.Tasks = DataBase.Tasks.map(item => {
          if (item.userId === id) item.userId = null;

          return item;
        });
        break;
      default:
        break;
    }
  }

  return row;
};

const save = (tableName, record) => {
  DataBase[tableName].push(record);

  return getById(tableName, record.id);
};

const update = async (tableName, id, record) => {
  const oldRecord = getById(tableName, id);
  const index = DataBase[tableName].indexOf(oldRecord);
  DataBase[tableName][index] = { ...record };

  return getById(tableName, id);
};

module.exports = {
  getAll,
  getById,
  remove,
  save,
  update
};
