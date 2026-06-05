import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Me2Me from "./pages/Me2Me";
import Products from "./pages/Products";
import ForeverProducts from "./pages/ForeverProducts";
import Consultation from "./pages/Consultation";
import Videos from "./pages/Videos";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// AnimatePresence needs to be inside BrowserRouter to access useLocation
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/"                     element={<Index />} />
        <Route path="/about"                element={<About />} />
        <Route path="/me2me"                element={<Me2Me />} />
        <Route path="/products"             element={<Products />} />
        <Route path="/products/forever"     element={<ForeverProducts />} />
        <Route path="/products/consultation" element={<Consultation />} />
        <Route path="/videos"               element={<Videos />} />
        <Route path="/contact"              element={<Contact />} />
        <Route path="/auth"                     element={<Auth />} />
        <Route path="/admin"                    element={<Admin />} />
        <Route path="/polityka-prywatnosci"     element={<PrivacyPolicy />} />
        <Route path="/regulamin"                element={<Terms />} />
        <Route path="*"                         element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;