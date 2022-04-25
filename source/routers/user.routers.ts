import express from 'express';
import * as controller from '../controllers/user.controllers';
const router = express.Router();

// Get
router.get('/users', controller.getUsers);
router.get('/users/:userId', controller.getUser);

// Post
router.post('/users/createUser', controller.createUser);

// Put
router.put('/users/updateUser/:userId', controller.updateUser);

// Delete
router.delete('/users/deleteUser/:userId', controller.deleteUser);

export default router;