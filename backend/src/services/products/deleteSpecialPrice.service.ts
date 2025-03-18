import { SpecialPrice } from "../../models/special_prices.model";

export const deleteSpecialPrice = async (special_price_id: any) => {
    try {

        if (!special_price_id) {
            throw Error("Special price ID is required");
        }

        const deleted_special_price = await SpecialPrice.findOneAndDelete({ _id: special_price_id });

        if (!deleted_special_price) {
            throw Error("Producto not found");
        }

        return deleted_special_price
    } catch (error) {
        console.error("Error eliminando producto:", error);
        throw Error("Error interno del servidor")
    }
};
