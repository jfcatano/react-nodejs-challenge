import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import PageLoader from "@/pages/PageLoader"
import { Outlet } from "react-router-dom"

export default function MainLayout() {
  return (
    <SidebarProvider>
      <div className="flex">
        
      <PageLoader />
        <AppSidebar />
        <SidebarInset className="flex-1">
          <Outlet /> {/* Aquí se renderiza el contenido de cada página */}
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
