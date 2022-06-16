import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import routes from './routes/allRoutes.routes';
import cors from 'cors'


const router: Express = express();
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 8000;

/** Logging */
router.use(morgan('dev'))
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(cors())

/** API RULES */
router.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
        return res.status(200).json({});
    }
    next();
});

/** Routes */
router.use('/', routes);

/** Success */
router.use('/', async (req, res, next) => {
    return res.status(200).json({
        success: 'Success'
    });
});

/** Error handling */
router.use((req, res) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/** Server */
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
