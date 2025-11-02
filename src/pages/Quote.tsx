import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { Send, CheckCircle } from "lucide-react";

const Quote = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    product: "",
    quantity: "",
    material: "",
    dimensions: "",
    additionalInfo: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // WhatsApp integration with detailed quote request
    const message = `Quotation Request:\n\nContact Details:\nName: ${formData.name}\nCompany: ${formData.company}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nProduct Details:\nProduct Type: ${formData.product}\nQuantity: ${formData.quantity}\nMaterial: ${formData.material}\nDimensions: ${formData.dimensions}\n\nAdditional Information:\n${formData.additionalInfo}`;
    
    const whatsappUrl = `https://wa.me/918951513146?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast.success("Quote request submitted!", {
      description: "We'll get back to you within 24 hours"
    });
    
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      product: "",
      quantity: "",
      material: "",
      dimensions: "",
      additionalInfo: ""
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
                <span className="text-primary font-semibold">Get a Quote</span>
              </div>
              <h1 className="text-5xl font-bold text-foreground mb-6">
                Request a Detailed Quotation
              </h1>
              <p className="text-xl text-muted-foreground">
                Fill out the form below and we'll provide you with a comprehensive quote tailored to your needs.
              </p>
            </div>
            
            <Card className="border-border shadow-[var(--shadow-card)]">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                      <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                      Contact Information
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Full Name *
                        </label>
                        <Input 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Company Name *
                        </label>
                        <Input 
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="ABC Industries"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Email Address *
                        </label>
                        <Input 
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@company.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Phone Number *
                        </label>
                        <Input 
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Product Details */}
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                      <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                      Product Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Product Type *
                        </label>
                        <Select value={formData.product} onValueChange={(value) => setFormData({ ...formData, product: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select product type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="orings">O-Rings</SelectItem>
                            <SelectItem value="gaskets">Gaskets</SelectItem>
                            <SelectItem value="seals">Seals</SelectItem>
                            <SelectItem value="washers">Washers</SelectItem>
                            <SelectItem value="stoppers">Stoppers</SelectItem>
                            <SelectItem value="bushes">Bushes</SelectItem>
                            <SelectItem value="diaphragms">Diaphragms</SelectItem>
                            <SelectItem value="bungs">Bungs & Quad Rings</SelectItem>
                            <SelectItem value="custom">Custom Component</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Quantity Required *
                          </label>
                          <Input 
                            required
                            value={formData.quantity}
                            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                            placeholder="e.g., 1000 pieces"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Material Preference
                          </label>
                          <Input 
                            value={formData.material}
                            onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                            placeholder="e.g., NBR, EPDM, Silicone"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Dimensions / Specifications
                        </label>
                        <Input 
                          value={formData.dimensions}
                          onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                          placeholder="e.g., OD: 50mm, ID: 40mm, Thickness: 5mm"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Additional Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                      <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">3</span>
                      Additional Information
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Special Requirements or Notes
                      </label>
                      <Textarea 
                        value={formData.additionalInfo}
                        onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                        placeholder="Tell us about your specific requirements, application, or any other details that will help us provide an accurate quote..."
                        rows={6}
                        className="resize-none"
                      />
                    </div>
                  </div>
                  
                  <div className="bg-secondary/50 p-6 rounded-lg">
                    <div className="flex items-start space-x-3 mb-4">
                      <CheckCircle className="text-primary mt-1 flex-shrink-0" size={20} />
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">What happens next?</h4>
                        <p className="text-sm text-muted-foreground">
                          Once you submit this form, our team will review your requirements and send you a detailed quotation 
                          within 24 hours including pricing, specifications, and delivery timeline.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full shadow-[var(--shadow-primary)]">
                    <Send className="mr-2" size={20} />
                    Submit Quote Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Quote;
