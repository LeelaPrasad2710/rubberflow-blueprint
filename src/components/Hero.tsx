import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Target } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBanner} 
          alt="Rubber manufacturing facility" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[var(--gradient-hero)]"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-4xl">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30">
            <span className="text-primary-foreground font-semibold">Since 1995 • Trusted Excellence</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Best Quality & Shapes in{" "}
            <span className="text-primary-glow">Rubber Products</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
            Let's Make India Proud by Stopping Imports! Precision rubber components for Automotive, Transport, Electronics & Battery industries.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-12">
            <Button size="lg" variant="default" asChild className="text-lg px-8 shadow-[var(--shadow-primary)]">
              <Link to="/quote">
                Get a Quote <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild className="text-lg px-8">
              <Link to="/portfolio">View Products</Link>
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-primary-foreground/20">
            <div className="flex items-start space-x-3">
              <Award className="text-primary-glow mt-1" size={24} />
              <div>
                <div className="text-3xl font-bold text-primary-foreground">100%</div>
                <div className="text-primary-foreground/80">Client Satisfaction</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Target className="text-primary-glow mt-1" size={24} />
              <div>
                <div className="text-3xl font-bold text-primary-foreground">29+</div>
                <div className="text-primary-foreground/80">Years Experience</div>
              </div>
            </div>
            <div className="flex items-start space-x-3 col-span-2 md:col-span-1">
              <Award className="text-primary-glow mt-1" size={24} />
              <div>
                <div className="text-3xl font-bold text-primary-foreground">1000+</div>
                <div className="text-primary-foreground/80">Products Delivered</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
