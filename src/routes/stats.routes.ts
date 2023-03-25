import itemsController from '../controllers/items.controller';
import * as express from 'express';
const router = express.Router();

router.get('/all', itemsController.getStatisticsAll);
router.get('/departments', itemsController.getStatisticsDepartment);
router.get('/sub-departments', itemsController.getStatisticsSubdepartment);
export default router;
