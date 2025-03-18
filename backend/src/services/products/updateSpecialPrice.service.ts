import { SpecialPrice } from "../../models/special_prices.model";

export const updateSpecialPrice = async (special_price_id: string, special_price_data: any) => {
    try {

        const updatedSpecialPrice = await SpecialPrice.findByIdAndUpdate(
            special_price_id,
            { $set: special_price_data },
            { new: true, runValidators: true }
        );

        if (!updatedSpecialPrice) {
            throw new Error("Special price not found");
        }

        return updatedSpecialPrice;
    } catch (error) {
        console.error("Error updating special price:", error);
        throw new Error("Internal server error");
    }
};
