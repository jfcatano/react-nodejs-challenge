import { Request, Response } from 'express'
import { productsService } from '../../services'

export const createSpecialPrice = async (req: Request,res: Response): Promise<any> => {
    try {
        const special_price = await productsService.createSpecialPrice(req.body)

        return res.status(200).json({message: 'Successfully created new special price', data: special_price,})
    } catch (error: any) {
        console.error('Error creating new special price', error)
        const errorMessage = error.message || 'Internal server error'

        return res.status(500).json({ message: errorMessage })
    }
}

export const getAllProducts = async (_req: Request, res: Response): Promise<any> => {
    try {

        const products = await productsService.getAllProducts()

        return res.status(200).json({message: 'Products fetched successfully', data: products })
    } catch (error: any) {
        console.error('Error fetching products:', error)
        const errorMessage = error.message || 'Internal server error'

        return res.status(500).json({ message: errorMessage })
    }
}

export const getProductsWithSpecialPrices = async (req: Request, res: Response): Promise<any> => {
    try {
        const user_id = req.params.user_id

        const products = await productsService.getAllProductsWithSpecialPrices(user_id)

        return res.status(200).json({message: 'Products with special price fetched successfully', data: products })
    } catch (error: any) {
        console.error('Error fetching products with special price:', error)
        const errorMessage = error.message || 'Internal server error'

        return res.status(500).json({ message: errorMessage })
    }
}

export const getAllSpecialPrices = async (_req: Request, res: Response): Promise<any> => {
    try {
        const special_prices = await productsService.getAllSpecialPrices()

        return res.status(200).json({message: 'Special prices successfully', data: special_prices })
    } catch (error: any) {
        console.error('Error fetching special prices:', error)
        const errorMessage = error.message || 'Internal server error'

        return res.status(500).json({ message: errorMessage })
    }
}

export const updateSpecialPrice = async (req: Request,res: Response): Promise<any> => {
    try {
        const special_price_id = req.params.special_price_id
        const special_price = await productsService.updateSpecialPrice(special_price_id, req.body)

        return res.status(200).json({message: 'Successfully updated special price', data: special_price,})
    } catch (error: any) {
        console.error('Error updating special price', error)
        const errorMessage = error.message || 'Internal server error'

        return res.status(500).json({ message: errorMessage })
    }
}

export const deleteSpecialPrice = async (req: Request,res: Response): Promise<any> => {
    try {
        const special_price_id = req.params.special_price_id
        const deleted_special_price = await productsService.deleteSpecialPrice(special_price_id)
        
        return res.status(200).json({ message: 'Successfully deleted the special price', data: deleted_special_price })
    } catch (error: any) {
        console.error('Error deleting special price', error)
        const errorMessage = error.message || 'Internal server error'

        return res.status(500).json({ message: errorMessage })
    }
}