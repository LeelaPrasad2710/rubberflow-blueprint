import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import productOrings from "@/assets/product-orings.jpg";
import productGaskets from "@/assets/product-gaskets.jpg";
import productWashers from "@/assets/product-washers.jpg";

const products = [
  { name: "O-Rings", description: "Precision sealing solutions in various sizes", image: productOrings },
  { name: "Gaskets", description: "Custom gaskets for all applications", image: productGaskets },
  { name: "Seals", description: "High-quality hydraulic and mechanical seals", image: productGaskets },
  { name: "Washers", description: "Rubber washers in multiple specifications", image: productWashers },
  { name: "Stoppers", description: "Durable stoppers for industrial use", image: productWashers },
  { name: "Bushes", description: "Precision bushings and bushes", image: productOrings },
  { name: "Diaphragms", description: "Industrial diaphragms for pumps", image: productGaskets },
  { name: "Bungs & Quad Rings", description: "Specialized sealing components", image: productOrings },
];

const Products = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <span className="text-primary font-semibold">Our Products</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Comprehensive Product Range
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From O-rings to specialized components, we manufacture precision rubber products for every industry need.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product) => (
            <Card key={product.name} className="group hover:shadow-[var(--shadow-card)] transition-all duration-300 border-border overflow-hidden">
              <div className="relative h-48 overflow-hidden bg-white">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  style={{ filter: "none", imageRendering: "auto" }}
                />
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {product.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Link 
            to="/portfolio" 
            className="inline-flex items-center space-x-2 text-primary hover:text-primary-glow font-semibold text-lg group"
          >
            <span>View Complete Catalog</span>
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Products;
