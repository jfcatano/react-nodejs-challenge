import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import EditSpecialPriceModal from "./EditSpecialPriceModal";

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

export default function SpecialPricesPage() {
    const [products, setProducts] = useState<SpecialPriceProduct[]>([]);
    const [productNames, setProductNames] = useState<Record<string, string>>(
        {}
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] =
        useState<SpecialPriceProduct | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    `${
                        import.meta.env.VITE_API_URL
                    }/products/specialprice/getall`
                );
                if (!response.ok) {
                    throw new Error("Error al obtener los precios especiales");
                }
                const result = await response.json();
                setProducts(result.data);
            } catch (error) {
                setError("No se pudieron cargar los datos.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        const fetchProductNames = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/products/getall/`
                );
                if (!response.ok) {
                    throw new Error(
                        "Error al obtener los nombres de los productos"
                    );
                }
                const result = await response.json();
                const nameMap: Record<string, string> = {};
                result.data.forEach((product: Product) => {
                    nameMap[product._id] = product.name;
                });
                setProductNames(nameMap);
            } catch (error) {
                console.error(
                    "Error al cargar los nombres de productos",
                    error
                );
            }
        };

        fetchProducts();
        fetchProductNames();
    }, []);

    const handleUpdatePrice = async (updatedProduct: SpecialPriceProduct) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/products/specialprice/update/${
                    updatedProduct._id
                }`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        special_price: updatedProduct.special_price,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Error al actualizar el precio especial");
            }

            setProducts((prev) =>
                prev.map((p) =>
                    p._id === updatedProduct._id ? updatedProduct : p
                )
            );
            setSelectedProduct(null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteProduct = async (productId: string) => {
        if (
            !window.confirm(
                "¿Estás seguro de que deseas eliminar este precio especial?"
            )
        )
            return;

        try {
            const response = await fetch(
                `${
                    import.meta.env.VITE_API_URL
                }/products/specialprice/delete/${productId}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Error al eliminar el precio especial");
            }

            // Eliminar el producto del estado
            setProducts((prev) => prev.filter((p) => p._id !== productId));
        } catch (error) {
            console.error("Error al eliminar el precio especial", error);
        }
    };

    return (
        <div className="flex flex-col gap-4 p-4">
            {/* Header */}
            <header className="flex h-16 shrink-0 items-center gap-2">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">
                                    Productos
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>
                                    Precios especiales
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>

            <Button onClick={() => navigate("/new-special-price")}>
                Nuevo precio especial
            </Button>
            <Table className="w-full">
                <TableCaption>Lista de precios especiales</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre del Producto</TableHead>
                        <TableHead>Usuario</TableHead>
                        <TableHead>Precio Especial</TableHead>
                        <TableHead>Moneda</TableHead>
                        <TableHead>Fecha Inicio</TableHead>
                        <TableHead>Fecha Fin</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={8} className="text-center">
                                Cargando...
                            </TableCell>
                        </TableRow>
                    ) : error ? (
                        <TableRow>
                            <TableCell
                                colSpan={8}
                                className="text-center text-red-500"
                            >
                                {error}
                            </TableCell>
                        </TableRow>
                    ) : (
                        products.map((product) => (
                            <TableRow key={product._id}>
                                <TableCell>
                                    {productNames[product.product_id] ||
                                        "Desconocido"}
                                </TableCell>
                                <TableCell>{product.user_id}</TableCell>
                                <TableCell>{product.special_price}</TableCell>
                                <TableCell>{product.currency}</TableCell>
                                <TableCell>
                                    {new Date(
                                        product.start_date
                                    ).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    {new Date(
                                        product.end_date
                                    ).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    {product.is_active ? "Activo" : "Inactivo"}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            setSelectedProduct(product)
                                        }
                                    >
                                        Editar
                                    </Button>

                                    <Button
                                        variant="destructive"
                                        onClick={() =>
                                            handleDeleteProduct(product._id)
                                        }
                                        className="ml-2"
                                    >
                                        Eliminar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            {selectedProduct && (
                <EditSpecialPriceModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    onSave={handleUpdatePrice}
                />
            )}
        </div>
    );
}
