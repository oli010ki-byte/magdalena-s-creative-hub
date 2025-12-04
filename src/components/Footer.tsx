import { Link } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Logo />
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <Link to="/about" className="hover:text-primary transition-colors">O mnie</Link>
            <Link to="/me2me" className="hover:text-primary transition-colors">Me2Me</Link>
            <Link to="/products" className="hover:text-primary transition-colors">Produkty</Link>
            <Link to="/videos" className="hover:text-primary transition-colors">Filmy</Link>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Magdalena Zając
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
