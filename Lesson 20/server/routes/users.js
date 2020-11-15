const express = require('express');
const shortid = require('shortid');
const router = express.Router();
const db = require('../database/database');

/* GET users listing. */
router.get('/', function(req, res, next) {
  let users = db.get('users');
  res.status(200).json({
    status: 'success',
    data: users,
  }); 

}).post('/', function(req, res, next) {
  if (!req.body) {
    return res.status(400).json({
      status: 'error',
      error: 'req body cannot be empty',
    });
  }

  let usersId = shortid.generate();
  db.get('users').push({...req.body, usersId }).write();

  res.status(200).json({
    status: 'success',
    data: usersId,
  });

}).delete('/:id', function(req, res, next) {
  let userForDelete = db.get('users').find(req.body).value();
  db.get('users').remove(userForDelete).write();

  res.status(200).json({
    status: 'success',
    data: userForDelete,
  })
})

module.exports = router;
