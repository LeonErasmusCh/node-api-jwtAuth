const { getData, postData, getById ,updateData, deleteData, login } = require('../controllers/main.controller');
const auth = require('../middlewares/auth')

const router = require('express').Router();

router.post('/login', login)                // login
router.get('/', auth, getData)              // get all
router.get('/:id',auth, getById)            // get by id
router.post('/', auth, postData)            // post
router.put('/', auth, updateData)           // update
router.delete('/:id',auth, deleteData)      // delete


module.exports = router;