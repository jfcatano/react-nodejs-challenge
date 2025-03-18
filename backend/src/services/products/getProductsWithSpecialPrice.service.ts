import { Product } from "../../models/products.model";
import { SpecialPrice } from "../../models/special_prices.model"; 

export const getAllProductsWithSpecialPrices = async (user_id: any) => {
  try {

    if (!user_id) {
      throw Error("User ID is required");
    }
    const products = await Product.find();

    const specialPrices = await SpecialPrice.find({
      user_id: user_id,
    });

    // Create a map of special prices for quick search
    const specialPriceMap = new Map(
      specialPrices.map((special) => [special.product_id.toString(), special.special_price])
    );

    // Modify the prices of the products if there is a special price after send the response
    const productsWithPrices = products.map((product) => {
      const specialPrice = specialPriceMap.get(product._id.toString());
      return {
        ...product.toObject(), 
        price: specialPrice !== undefined ? specialPrice : product.price, // Use the special price if it exists
      };
    });

    return productsWithPrices
  } catch (error) {
    throw Error("Error fetching products");
  }
};
