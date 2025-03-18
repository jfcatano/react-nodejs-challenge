import { Schema, model } from "mongoose";

interface IProduct {
    name: string;
    price: number;
    category: string;
    stock: number;
    description: string;
    brand: string;
    sku: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String, required: true },
        stock: { type: Number, required: true },
        description: { type: String, required: true },
        brand: { type: String, required: true },
        sku: { type: String, required: true, unique: true },
        tags: { type: [String], default: [] },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export const Product = model<IProduct>(
  "productos",
  ProductSchema
);
