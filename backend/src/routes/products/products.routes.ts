import { Router } from 'express'
import { productsController } from '../../controllers'

const router = Router()

const { getAllProducts, getProductsWithSpecialPrices, createSpecialPrice, getAllSpecialPrices, updateSpecialPrice, deleteSpecialPrice
 } = productsController

router.post('/specialprice/create/:user_id', createSpecialPrice)
router.get('/getall/:user_id', getProductsWithSpecialPrices)
router.get('/specialprice/getall', getAllSpecialPrices)
router.put('/specialprice/update/:special_price_id', updateSpecialPrice)
router.delete('/specialprice/delete/:special_price_id', deleteSpecialPrice)

router.get('/getall', getAllProducts)

export default router