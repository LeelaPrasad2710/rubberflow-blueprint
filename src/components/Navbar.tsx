import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            <div className="text-2xl font-bold">
              <span className="text-primary">Necessity</span>
              <span className="text-accent"> Rubber Products</span>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link to="/portfolio" className="text-foreground hover:text-primary transition-colors font-medium">
              Products
            </Link>
            <Link to="/quote" className="text-foreground hover:text-primary transition-colors font-medium">
              Get Quote
            </Link>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <a href="tel:8951513146" className="flex items-center space-x-1 hover:text-primary transition-colors">
                <Phone size={16} />
                <span>8951513146</span>
              </a>
              <a href="mailto:VisionRubberProduct@Gmail.com" className="flex items-center space-x-1 hover:text-primary transition-colors">
                <Mail size={16} />
              </a>
            </div>
            
            <Button variant="default" size="lg" asChild>
              <Link to="/quote">Get a Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
