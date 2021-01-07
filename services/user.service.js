const config = require('./dbconfig');
const sql = require('mssql');

async function getUsers() {
  try {
    let pool = await sql.connect(config);
    let users = await pool.request().query('Select * from AppUser');
    return users.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function getUserById(userId) {
  try {
    let pool = await sql.connect(config);
    let user = await pool
      .request()
      .input('input_parameter', sql.Int, userId)
      .query('Select * from AppUser where Id= @Input_parameter');
    return user.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function createUser(user) {
  try {
    let pool = await sql.connect(config);
    let insertedUser = await pool
      .request()
      .input('input_parameter', sql.VarChar, user.Name)
      .execute('spInserUser');
    return insertedUser.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function updateUser(user) {
  try {
    let pool = await sql.connect(config);
    let userFromDb = await pool
      .request()
      .input('input_parameter', sql.Int, user.Id)
      .query('Select * from AppUser where Id= @Input_parameter');
    if (userFromDb == null) return null;

    let updatedUser = await pool
      .request()
      .input('input_parameter', sql.Int, user.Id)
      .input('input_parameter', sql.VarChar, user.Name)
      .execute('spUpdateUser');
    return updatedUser.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function deleteUser(user) {
  try {
    let pool = await sql.connect(config);
    let userFromDb = await pool
      .request()
      .input('input_parameter', sql.Int, user.Id)
      .query('Select * from AppUser where Id= @Input_parameter');
    if (userFromDb == null) return null;

    let count = await pool
      .request()
      .input('input_parameter', sql.Int, user.Id)
      .execute('spDeleteUser');
    return count;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getUsers: getUsers,
  getUserById: getUserById,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
};
