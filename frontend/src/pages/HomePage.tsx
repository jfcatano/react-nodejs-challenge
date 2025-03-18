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

interface Product {
    _id: string;
    name: string;
    price: number;
    category: string;
    stock: number;
    description: string;
    brand: string;
    sku: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

export default function HomePage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/products/getall/1`
                );
                if (!response.ok) {
                    throw new Error("Error al obtener los productos");
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

        fetchProducts();
    }, []);

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
                                    Todos los productos
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>

            {/* Contenido principal */}
            <div className="grid auto-rows-min gap-4 md:grid-cols-1">

                <Table className="w-full">
                    <TableCaption>
                        Lista de productos (Aplicando precio especial si lo
                        tiene)
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Precio</TableHead>
                            <TableHead>Categoría</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Descripción</TableHead>
                            <TableHead>Marca</TableHead>
                            <TableHead>SKU</TableHead>
                            <TableHead>Etiquetas</TableHead>
                            <TableHead>Fecha de Creación</TableHead>
                            <TableHead>Última Actualización</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={10} className="text-center">
                                    Cargando...
                                </TableCell>
                            </TableRow>
                        ) : error ? (
                            <TableRow>
                                <TableCell
                                    colSpan={10}
                                    className="text-center text-red-500"
                                >
                                    {error}
                                </TableCell>
                            </TableRow>
                        ) : (
                            products.map((product) => (
                                <TableRow key={product._id}>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell>{product.brand}</TableCell>
                                    <TableCell>{product.sku}</TableCell>
                                    <TableCell>
                                        {product.tags.join(", ")}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(
                                            product.createdAt
                                        ).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(
                                            product.updatedAt
                                        ).toLocaleDateString()}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
    );
}
