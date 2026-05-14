import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppFab } from "./WhatsAppFab";
import { CartDrawer } from "./CartDrawer";

export const Layout = () => (
  <div className="min-h-dvh flex flex-col">
    <Header />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
    <WhatsAppFab />
    <CartDrawer />
  </div>
);
