import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogIn, LogOut, Shield } from "lucide-react";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import CartButton from "./CartButton";
const navItems = [{
  name: "Strona główna",
  path: "/"
}, {
  name: "O mnie",
  path: "/about"
}, {
  name: "Me2Me",
  path: "/me2me"
}, {
  name: "Produkty",
  path: "/products"
}, {
  name: "Filmy",
  path: "/videos"
}, {
  name: "Kontakt",
  path: "/contact"
}];
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const {
    user,
    isAdmin,
    signOut
  } = useAuth();
  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };
  return <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => <Link key={item.path} to={item.path} className={`relative text-sm font-medium transition-colors duration-300 ${location.pathname === item.path ? "text-primary" : "text-muted-foreground hover:text-primary"}`}>
                {item.name}
                {location.pathname === item.path && <motion.div layoutId="activeNav" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-soft-gold rounded-full text-[#442d1d]" />}
              </Link>)}
            
            <CartButton />
            
            {user ? <div className="flex items-center gap-3">
                {isAdmin && <Button asChild variant="ghost" size="sm" className="text-soft-gold hover:text-soft-gold hover:bg-soft-gold/10">
                    <Link to="/admin">
                      <Shield className="w-4 h-4" />
                      Panel admina
                    </Link>
                  </Button>}
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4" />
                  Wyloguj
                </Button>
              </div> : <Button asChild variant="outline" size="sm">
                <Link to="/auth">
                  <LogIn className="w-4 h-4" />
                  Zaloguj
                </Link>
              </Button>}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <CartButton />
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: "auto"
      }} exit={{
        opacity: 0,
        height: 0
      }} className="md:hidden glass-effect border-t border-border/50">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navItems.map(item => <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)} className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${location.pathname === item.path ? "bg-secondary text-primary" : "text-muted-foreground hover:bg-secondary/50"}`}>
                  {item.name}
                </Link>)}
              
              {user ? <>
                  {isAdmin && <Link to="/admin" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-lg text-sm font-medium text-soft-gold bg-soft-gold/10 hover:bg-soft-gold/20 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Panel admina
                    </Link>}
                  <button onClick={handleSignOut} className="px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary/50 text-left flex items-center gap-2">
                    <LogOut className="w-4 h-4" />
                    Wyloguj
                  </button>
                </> : <Link to="/auth" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary/50 flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Zaloguj
                </Link>}
            </div>
          </motion.div>}
      </AnimatePresence>
    </nav>;
};
export default Navigation;