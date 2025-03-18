import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface SpecialPriceProduct {
    _id: string;
    product_id: string;
    user_id: string;
    special_price: number;
    currency: string;
    start_date: string;
    end_date: string;
    is_active: boolean;
    createdAt: string;
    updatedAt: string;
}

interface Product {
    _id: string;
    name: string;
}

interface EditSpecialPriceModalProps {
    product: SpecialPriceProduct | null;
    onSave: (updatedProduct: SpecialPriceProduct) => void;
    onClose: () => void;
}

export default function EditSpecialPriceModal({
    product,
    onSave,
    onClose,
}: EditSpecialPriceModalProps) {
    const [formData, setFormData] = useState<SpecialPriceProduct>(
        product
            ? { ...product }
            : {
                  _id: "",
                  product_id: "",
                  user_id: "1",
                  special_price: 0,
                  currency: "",
                  start_date: "",
                  end_date: "",
                  is_active: false,
                  createdAt: "",
                  updatedAt: "",
              }
    );

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/products/getall/`
                );
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Error al obtener productos"
                    );
                }

                setProducts(data.data);
            } catch (error) {
                setError(
                    error instanceof Error ? error.message : "Error desconocido"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleProductSelect = (value: string) => {
        setFormData((prev) => ({ ...prev, product_id: value }));
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    return (
        <Dialog open={!!product} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Precio Especial</DialogTitle>
                    <DialogDescription>
                        Modifica los detalles del precio especial para este
                        producto.
                    </DialogDescription>
                </DialogHeader>
                {product && (
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="product_id" className="text-right">
                                Producto
                            </Label>
                            {loading ? (
                                <span className="col-span-3">
                                    Cargando productos...
                                </span>
                            ) : error ? (
                                <span className="col-span-3 text-red-500">
                                    {error}
                                </span>
                            ) : (
                                <Select
                                    value={formData.product_id}
                                    onValueChange={handleProductSelect}
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue>
                                            {products.find(
                                                (p) =>
                                                    p._id ===
                                                    formData.product_id
                                            )?.name || "Selecciona un producto"}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {products.map((product) => (
                                            <SelectItem
                                                key={product._id}
                                                value={product._id}
                                            >
                                                {product.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="user_id" className="text-right">
                                Usuario
                            </Label>
                            <Input
                                id="user_id"
                                name="user_id"
                                value={formData.user_id}
                                onChange={handleChange}
                                className="col-span-3"
                                disabled
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="currency" className="text-right">
                                Moneda
                            </Label>
                            <Input
                                id="currency"
                                name="currency"
                                value={formData.currency}
                                onChange={handleChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="start_date" className="text-right">
                                Fecha Inicio
                            </Label>
                            <Input
                                id="start_date"
                                name="start_date"
                                type="date"
                                value={formData.start_date}
                                onChange={handleChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="end_date" className="text-right">
                                Fecha Fin
                            </Label>
                            <Input
                                id="end_date"
                                name="end_date"
                                type="date"
                                value={formData.end_date}
                                onChange={handleChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="is_active" className="text-right">
                                Estado
                            </Label>
                            <Select
                                value={
                                    formData.is_active ? "activo" : "inactivo"
                                }
                                onValueChange={(value) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        is_active: value === "activo",
                                    }))
                                }
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue>
                                        {formData.is_active
                                            ? "Activo"
                                            : "Inactivo"}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="activo">
                                        Activo
                                    </SelectItem>
                                    <SelectItem value="inactivo">
                                        Inactivo
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="special_price"
                                className="text-right"
                            >
                                Nuevo Precio
                            </Label>
                            <Input
                                id="special_price"
                                name="special_price"
                                type="number"
                                value={formData.special_price}
                                onChange={handleChange}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                )}
                <DialogFooter>
                    <Button onClick={handleSave}>Guardar Cambios</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
