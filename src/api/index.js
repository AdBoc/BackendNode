const {Router} = require('express');
const tasksRouting = require('./task/index');

const router = new Router();
router.use('/api', tasksRouting);

module.exports = router;