import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, ArrowRight } from "lucide-react";
import productsHero from "@/assets/products-hero.jpg";
import productOrings from "@/assets/product-orings.jpg";
import productGaskets from "@/assets/product-gaskets.jpg";
import productWashers from "@/assets/product-washers.jpg";

const products = [
  {
    name: "O-Rings",
    image: productOrings,
    specs: "Various sizes and materials",
    industries: ["Automotive", "Electronics", "Battery"],
    description: "Precision-engineered O-rings for sealing applications across multiple industries."
  },
  {
    name: "Gaskets",
    image: productGaskets,
    specs: "Custom shapes and dimensions",
    industries: ["Automotive", "Transport"],
    description: "High-quality gaskets manufactured to exact specifications for reliable sealing."
  },
  {
    name: "Seals",
    image: productGaskets,
    specs: "Hydraulic and mechanical variants",
    industries: ["Automotive", "Electronics"],
    description: "Durable seals designed for high-pressure and high-temperature applications."
  },
  {
    name: "Washers",
    image: productWashers,
    specs: "Multiple thickness options",
    industries: ["Electronics", "Battery"],
    description: "Precision washers in various materials for electrical insulation and cushioning."
  },
  {
    name: "Stoppers",
    image: productWashers,
    specs: "Industrial grade",
    industries: ["Transport", "Automotive"],
    description: "Robust stoppers for vibration damping and noise reduction."
  },
  {
    name: "Bushes",
    image: productOrings,
    specs: "Custom bore sizes",
    industries: ["Automotive", "Transport"],
    description: "Precision bushings for suspension and mounting applications."
  },
  {
    name: "Diaphragms",
    image: productGaskets,
    specs: "Pump and valve grade",
    industries: ["Automotive", "Electronics"],
    description: "Flexible diaphragms for pumps, valves, and control systems."
  },
  {
    name: "Bungs & Quad Rings",
    image: productOrings,
    specs: "Specialized sealing",
    industries: ["Battery", "Transport"],
    description: "Specialized components for complex sealing requirements."
  },
];

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-secondary/50 to-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
                <span className="text-primary font-semibold">Complete Product Catalog</span>
              </div>
              <h1 className="text-5xl font-bold text-foreground mb-6">
                Precision Rubber Components
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Browse our comprehensive range of rubber products, manufactured with precision and tested for quality. 
                Each component is designed for specific industrial applications.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" variant="default" asChild>
                  <Link to="/quote">
                    Request Quote <ArrowRight className="ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="secondary">
                  <FileText className="mr-2" />
                  Download Brochure
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={productsHero} 
                alt="Rubber products" 
                className="rounded-2xl shadow-[var(--shadow-card)]"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Products Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.name} className="border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-primary)] transition-all duration-300">
                <div className="relative h-64 overflow-hidden rounded-t-xl">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {product.description}
                  </p>
                  <div className="mb-4">
                    <div className="text-sm font-semibold text-foreground mb-1">Specifications:</div>
                    <div className="text-sm text-muted-foreground">{product.specs}</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground mb-2">Industries:</div>
                    <div className="flex flex-wrap gap-2">
                      {product.industries.map((industry) => (
                        <span 
                          key={industry} 
                          className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                        >
                          {industry}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-[var(--gradient-primary)] text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Need a Custom Solution?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            We specialize in creating custom rubber components tailored to your specific requirements. 
            Get a detailed quotation today.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/quote">
              Get Custom Quote <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Portfolio;
