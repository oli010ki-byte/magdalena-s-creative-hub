import { ReactNode } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";
import ScrollProgress from "./ScrollProgress";
import PageTransition from "./PageTransition";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <div className="min-h-screen flex flex-col">
    <ScrollProgress />
    <Navigation />
    <main className="flex-1 pt-16 md:pt-[72px]">
      <PageTransition>
        {children}
      </PageTransition>
    </main>
    <Footer />
    <CartDrawer />
  </div>
);

export default Layout;