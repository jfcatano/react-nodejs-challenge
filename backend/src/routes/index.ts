import { Router } from 'express'
import productsRoutes from './products/products.routes'

const router = Router()

router.use('/products', productsRoutes)

export default router 