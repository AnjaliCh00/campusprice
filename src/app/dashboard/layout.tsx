import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      {/* ✅ Dark Sidebar */}
      <AppSidebar />

      {/* ✅ Main Content Area */}
      <SidebarInset className="bg-slate-900 text-slate-100">
        {/* ✅ Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-800 bg-slate-900 px-4">
          <SidebarTrigger className="-ml-1 text-slate-300 hover:text-white transition-colors" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4 bg-slate-700"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink
                  href="#"
                  className="text-slate-300 hover:text-indigo-400 transition-colors"
                >
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block text-slate-600" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-slate-100 font-semibold">
                  Data Fetching
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* ✅ Content */}
        <div className="flex flex-1 flex-col gap-4 p-4 bg-slate-900 text-slate-100">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
