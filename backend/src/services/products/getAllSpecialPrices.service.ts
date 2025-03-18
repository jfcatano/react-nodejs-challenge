import { SpecialPrice } from "../../models/special_prices.model";

export const getAllSpecialPrices = async () => {
  try {
   
    const special_prices = await SpecialPrice.find();
    
    return special_prices

  } catch (error) {
    throw Error("Error al obtener los productos");
  }
};
