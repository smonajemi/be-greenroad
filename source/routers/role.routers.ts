import express from 'express';
import * as controller from '../controllers/role.controllers';
const router = express.Router();

// Get
router.get('/roles/:userId', controller.getRoleByUserId);

// Put
router.put('/roles/updateRole/:userId', controller.updateRole);

export default router;