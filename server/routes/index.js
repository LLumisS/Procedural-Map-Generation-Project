const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const mapRouter = require('./mapRouter');
const matrixRouter = require('./matrixRouter');

router.use('/user', userRouter);
router.use('/map', mapRouter);
router.use('/matrix', matrixRouter);

module.exports = router;