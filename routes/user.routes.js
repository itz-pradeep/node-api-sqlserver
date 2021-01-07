const userService = require('user.service');
const express = require('express');

const router = express.Router();

router.get('/users', (request, response) => {
  let users = userService.getUsers();
  return response.status(200).json(users);
});
router.get('/users/:id', (request, response) => {});
router.post('./users', (request, response) => {});
router.put('/users/:id', (request, response) => {});
router.delete('/users/:id', (request, response) => {});

export const userRoutes = router;
