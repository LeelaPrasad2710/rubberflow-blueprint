import { CheckCircle, Target, Eye } from "lucide-react";
import qualityControl from "@/assets/quality-control.jpg";

const About = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-primary font-semibold">About Necessity Rubber Products</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Shapes and Quality Specialist
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Necessity Rubber Products was established in <span className="font-semibold text-primary">1995</span>. We are experts in producing various kinds of rubber components including O-rings, gaskets, seals, washers, buffers, stoppers, bushes, bungs, quad rings, diaphragms, hydraulic seals and chevron packing.
            </p>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We make precision rubber components for different industries including Automotive, Transport, Electrical & Electronic, and Specialized Battery Rubber Components.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start space-x-3">
                <div className="mt-1 p-2 bg-primary/10 rounded-lg">
                  <Eye className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground mb-1">Our Vision</h3>
                  <p className="text-muted-foreground">100% Client Satisfaction</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="mt-1 p-2 bg-primary/10 rounded-lg">
                  <Target className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground mb-1">Our Mission</h3>
                  <p className="text-muted-foreground">Best Quality and Shapes</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              {["Tested Rubber Components", "Precision Manufacturing", "Quality Assurance", "Made in Bangalore, India"].map((item) => (
                <div key={item} className="flex items-center space-x-3">
                  <CheckCircle className="text-primary flex-shrink-0" size={20} />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-[var(--shadow-card)]">
              <img 
                src={qualityControl} 
                alt="Quality control at Necessity Rubber Products" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-[var(--shadow-primary)]">
              <div className="text-4xl font-bold">29+</div>
              <div className="text-sm">Years of Excellence</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
