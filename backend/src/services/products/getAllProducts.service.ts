import { Product } from "../../models/products.model";

export const getAllProducts = async () => {
  try {

    const products = await Product.find();
    
    return products

  } catch (error) {
    throw Error("Error al obtener los productos");
  }
};
