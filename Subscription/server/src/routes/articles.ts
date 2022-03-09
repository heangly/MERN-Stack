import { Router } from 'express'
import { getArticles } from '../controllers/articleControllers'
import { protect } from '../middleware/authMiddleware'

const router = Router()

router.get('/', protect, getArticles)

export default router
