import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";

interface IProduct {
    _id: string;
    name: string;
}

const formSchema = z.object({
    product_id: z.string().min(1, "Debe seleccionar un producto"),
    user_id: z.string().min(1, "El ID de usuario es obligatorio"),
    special_price: z.coerce.number().min(0, "El precio debe ser positivo"),
    currency: z.enum(["USD", "EUR", "COP"]),
    start_date: z.string().min(1, "Debe seleccionar una fecha de inicio"),
    end_date: z.string().min(1, "Debe seleccionar una fecha de fin"),
    is_active: z.boolean().default(true),
});

type FormData = z.infer<typeof formSchema>;

export default function SpecialPriceForm() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const navigate = useNavigate();

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            product_id: "",
            user_id: "1",
            special_price: 0,
            currency: "USD",
            start_date: "",
            end_date: "",
            is_active: true,
        },
    });

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/products/getall`)
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data.data)) {
                    setProducts(data.data);
                } else {
                    console.error("La API no devolvió un array válido:", data);
                }
            })
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    const onSubmit = async (values: FormData) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/products/specialprice/create/${
                    values.user_id
                }`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                }
            );
            if (!response.ok) throw new Error("Error al guardar");
            navigate("/");
        } catch (error) {
            console.error(error);
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
                                    Crear nuevo precio especial
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>

            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle>Nuevo Precio Especial</CardTitle>
                    <CardDescription>
                        Registra un precio especial para un producto. En este
                        caso usamos el ID de usuario "1" para simular un usuario
                        (ya que no tenemos una colección o base de datos de
                        usuarios).
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="product_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Producto</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    value={field.value}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecciona un producto" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {products.map(
                                                            (product) => (
                                                                <SelectItem
                                                                    key={
                                                                        product._id
                                                                    }
                                                                    value={
                                                                        product._id
                                                                    }
                                                                >
                                                                    {
                                                                        product.name
                                                                    }
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="user_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>ID de Usuario</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled
                                                    placeholder="ID del usuario"
                                                    {...field}
                                                    value="1"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="special_price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Precio Especial
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="currency"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Moneda</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    value={field.value}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecciona una moneda" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="USD">
                                                            USD
                                                        </SelectItem>
                                                        <SelectItem value="EUR">
                                                            EUR
                                                        </SelectItem>
                                                        <SelectItem value="COP">
                                                            COP
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="start_date"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Fecha de Inicio
                                            </FormLabel>
                                            <FormControl>
                                                <Input type="date" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="end_date"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Fecha de Fin</FormLabel>
                                            <FormControl>
                                                <Input type="date" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => navigate("/")}>
                        Cancelar
                    </Button>
                    <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                        Guardar
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
