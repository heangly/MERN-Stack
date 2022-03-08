import { Router } from 'express'
import {
  checkoutPayment,
  getPrices
} from '../controllers/subcriptionController'
import { protect } from '../middleware/authMiddleware'

const router = Router()

router.get('/prices', protect, getPrices)
router.post('/session', protect, checkoutPayment)

export default router
