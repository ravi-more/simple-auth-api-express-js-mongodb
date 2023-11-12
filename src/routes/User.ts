import express from 'express';
import controller from '../controllers/User';
import { loginRequired } from '..';

const router = express.Router();

router.post('/create', controller.createUser);
router.get('/get/:userId', loginRequired.user, controller.readUser);
router.get('/get', loginRequired.user, controller.readAllUser);
router.patch('/update/:userId', loginRequired.user, controller.updateUser);
router.delete('/delete/:userId', loginRequired.user, controller.deleteUser);
router.patch('/change/password', loginRequired.user, controller.changeUserPassword);

export = router;
