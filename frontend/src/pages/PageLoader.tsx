import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function PageLoader() {
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const timeout = setTimeout(() => setLoading(false), 750); // Simulamos carga de 750ms, ya que el contenido es poco y no se lograría ver la animación de carga.

        return () => clearTimeout(timeout);
    }, [location.pathname]);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-2">
                <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                <span className="text-gray-700 font-semibold">Cargando...</span>
            </div>
        </div>
    );
}
