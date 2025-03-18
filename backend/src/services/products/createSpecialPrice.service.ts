import { SpecialPrice } from "../../models/special_prices.model";
import { Product } from "../../models/products.model";

export const createSpecialPrice = async (special_price_product: any) => {
  try {
    const { product_id, user_id, special_price, currency, start_date, end_date } = special_price_product;

    // Verify if the product exists in the "productos" collection
    const productExists = await Product.findById(product_id);
    if (!productExists) {
      throw Error("Product not found");
    }

    // Create de special product
    const newSpecialPrice = new SpecialPrice({
      product_id,
      user_id,
      special_price,
      currency,
      start_date,
      end_date,
      is_active: true,
    });

    // Save the new product in the database
    await newSpecialPrice.save();

    return newSpecialPrice;
  } catch (error) {
    console.error("Error creating special price:", error);
    throw Error("Internal server error");
  }
};
