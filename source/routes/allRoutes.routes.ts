import express from 'express';
const router = express.Router();

import UserRouter from '../routers/user.routers'
import RoleRouter from '../routers/role.routers'


router
.use(UserRouter)
.use(RoleRouter)

export default router