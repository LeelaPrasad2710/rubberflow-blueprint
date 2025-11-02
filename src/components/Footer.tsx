import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-accent text-accent-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-primary">Necessity</span> Rubber Products
            </h3>
            <p className="text-accent-foreground/80 mb-4 leading-relaxed">
              Since 1995, we've been manufacturing precision rubber components for industries across India. 
              Our mission: Make India proud by stopping imports with quality local manufacturing.
            </p>
            <div className="flex space-x-4">
              <a href="tel:+91 8553623757" className="text-primary hover:text-primary-glow transition-colors">
                <Phone size={20} />
              </a>
              <a href="mailto:VisionRubberProduct@Gmail.com" className="text-primary hover:text-primary-glow transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-accent-foreground/80 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-accent-foreground/80 hover:text-primary transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/quote" className="text-accent-foreground/80 hover:text-primary transition-colors">
                  Get Quote
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-lg">Contact Info</h4>
            <ul className="space-y-3 text-accent-foreground/80">
              <li className="flex items-start space-x-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>Bangalore, Karnataka, India</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone size={18} className="mt-1 flex-shrink-0" />
                <div>
                  <a href="tel:+91 8553623757" className="hover:text-primary transition-colors block">
                    +91 +91 8553623757
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <Mail size={18} className="mt-1 flex-shrink-0" />
                <a href="mailto:VisionRubberProduct@Gmail.com" className="hover:text-primary transition-colors break-all">
                  VisionRubberProduct@Gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-accent-foreground/20 pt-8 text-center text-accent-foreground/60">
          <p>© {new Date().getFullYear()} Necessity Rubber Products. All rights reserved. | Established 1995</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
