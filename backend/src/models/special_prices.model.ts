import mongoose, { Schema, Document } from "mongoose";

export interface ISpecialPrice extends Document {
  product_id: mongoose.Types.ObjectId;
  user_id: string;
  special_price: number;
  currency: string;
  start_date: Date;
  end_date: Date;
  is_active: boolean;
}

const SpecialPriceSchema = new Schema<ISpecialPrice>(
  {
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "productos", required: true },
    user_id: { type: String, required: true },
    special_price: { type: Number, required: true },
    currency: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true } // Add createdAt y updatedAt
);

export const SpecialPrice = mongoose.model<ISpecialPrice>(
  "preciosEspecialesCatano17",
  SpecialPriceSchema
);
