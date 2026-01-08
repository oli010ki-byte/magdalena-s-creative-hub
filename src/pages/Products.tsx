import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit2, X, ShoppingCart, LogIn, Upload, ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useProducts, useAddProduct, useUpdateProduct, useDeleteProduct, Product } from "@/hooks/useProducts";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useCartStore } from "@/stores/cartStore";
import foreverCover from "@/assets/forever/forever-cover.png";
import consultationCover from "@/assets/consultation-cover.png";
const Products = () => {
  const {
    data: products = [],
    isLoading
  } = useProducts();
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const {
    isAdmin,
    user
  } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    addItem
  } = useCartStore();
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: ""
  });
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      image: "",
      category: ""
    });
    setIsAddingProduct(false);
    setEditingProduct(null);
  };
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Proszę wybrać plik obrazu');
      return;
    }
    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const {
        error: uploadError
      } = await supabase.storage.from('product-images').upload(fileName, file);
      if (uploadError) throw uploadError;
      const {
        data: {
          publicUrl
        }
      } = supabase.storage.from('product-images').getPublicUrl(fileName);
      setFormData({
        ...formData,
        image: publicUrl
      });
      toast.success('Zdjęcie zostało przesłane');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Błąd podczas przesyłania zdjęcia');
    } finally {
      setIsUploading(false);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;
    const productData = {
      name: formData.name,
      description: formData.description || null,
      price: parseFloat(formData.price),
      image: formData.image || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400",
      category: formData.category || null
    };
    if (editingProduct) {
      updateProduct.mutate({
        id: editingProduct.id,
        ...productData
      });
    } else {
      addProduct.mutate(productData);
    }
    resetForm();
  };
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || "",
      price: product.price.toString(),
      image: product.image || "",
      category: product.category || ""
    });
    setIsAddingProduct(true);
  };
  const handleDelete = (id: string) => {
    deleteProduct.mutate(id);
  };
  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
  return <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="text-center mb-12">
            <span className="inline-block text-sm font-medium text-soft-gold mb-4">
              Sklep
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6">
              Produkty
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Kursy, e-booki i usługi wspierające Twoją transformację
            </p>
            
            {isAdmin && <Button variant="gold" onClick={() => setIsAddingProduct(true)}>
                <Plus className="w-5 h-5" />
                Dodaj produkt
              </Button>}
            
            {!user && <Button asChild variant="outline">
                <Link to="/auth">
                  <LogIn className="w-5 h-5" />
                  Panel admina
                </Link>
              </Button>}
          </motion.div>

          {/* Add/Edit Product Modal */}
          <AnimatePresence>
            {isAddingProduct && isAdmin && <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} exit={{
            opacity: 0
          }} className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && resetForm()}>
                <motion.div initial={{
              scale: 0.95,
              opacity: 0
            }} animate={{
              scale: 1,
              opacity: 1
            }} exit={{
              scale: 0.95,
              opacity: 0
            }} className="bg-card rounded-2xl p-6 w-full max-w-md border border-border shadow-card max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-serif text-xl font-semibold text-foreground">
                      {editingProduct ? "Edytuj produkt" : "Dodaj produkt"}
                    </h2>
                    <Button variant="ghost" size="icon" onClick={resetForm}>
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">
                        Nazwa *
                      </label>
                      <Input value={formData.name} onChange={e => setFormData({
                    ...formData,
                    name: e.target.value
                  })} placeholder="Nazwa produktu" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">
                        Opis
                      </label>
                      <Textarea value={formData.description} onChange={e => setFormData({
                    ...formData,
                    description: e.target.value
                  })} placeholder="Opis produktu" rows={3} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">
                          Cena (PLN) *
                        </label>
                        <Input type="number" value={formData.price} onChange={e => setFormData({
                      ...formData,
                      price: e.target.value
                    })} placeholder="0" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">
                          Kategoria
                        </label>
                        <Input value={formData.category} onChange={e => setFormData({
                      ...formData,
                      category: e.target.value
                    })} placeholder="np. Kursy" />
                      </div>
                    </div>
                    
                    {/* Image Upload Section */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Zdjęcie produktu
                      </label>
                      <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                      
                      {formData.image ? <div className="relative">
                          <img src={formData.image} alt="Podgląd" className="w-full h-40 object-cover rounded-lg border border-border" />
                          <div className="absolute top-2 right-2 flex gap-2">
                            <Button type="button" variant="warm" size="icon" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button type="button" variant="warm" size="icon" onClick={() => setFormData({
                        ...formData,
                        image: ""
                      })}>
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div> : <button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploading} className="w-full h-40 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 hover:border-soft-gold hover:bg-soft-gold/5 transition-colors">
                          {isUploading ? <div className="animate-pulse text-muted-foreground">
                              Przesyłanie...
                            </div> : <>
                              <Upload className="w-8 h-8 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                Kliknij, aby dodać zdjęcie
                              </span>
                            </>}
                        </button>}
                      
                      <p className="text-xs text-muted-foreground mt-2">
                        lub wklej URL zdjęcia:
                      </p>
                      <Input value={formData.image} onChange={e => setFormData({
                    ...formData,
                    image: e.target.value
                  })} placeholder="https://..." className="mt-1" />
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <Button type="button" variant="outline" className="flex-1" onClick={resetForm}>
                        Anuluj
                      </Button>
                      <Button type="submit" variant="gold" className="flex-1" disabled={addProduct.isPending || updateProduct.isPending || isUploading}>
                        {editingProduct ? "Zapisz" : "Dodaj"}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>}
          </AnimatePresence>

          {/* Categories Filter */}
          {categories.length > 0 && <div className="flex flex-wrap gap-2 justify-center mb-12">
              {categories.map((category, index) => <span key={`${category}-${index}`} className="px-4 py-2 bg-secondary rounded-full text-sm text-secondary-foreground">
                  {category as string}
                </span>)}
            </div>}

          {/* Loading State */}
          {isLoading && <div className="text-center py-20">
              <p className="text-muted-foreground">Ładowanie produktów...</p>
            </div>}

          {/* Products Grid */}
          {!isLoading && <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Special Consultation Card - First */}
              <motion.div initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover-lift">
                <Link to="/products/consultation" className="block">
                  <div className="aspect-[4/3] relative overflow-hidden bg-secondary/30">
                    <img src={consultationCover} alt="Konsultacja 1:1 z Magdą" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute top-3 left-3 px-3 py-1 bg-card/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">Mentoring 1:1</span>
                    <span className="absolute top-3 right-3 px-3 py-1 bg-soft-gold text-foreground rounded-full text-xs font-bold">160 zł</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                      Konsultacja 1:1
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      Indywidualny mentoring - strategia dopasowana do Twoich potrzeb
                    </p>
                    <div className="flex items-center justify-end">
                      <Button variant="gold" size="sm">
                        <ArrowRight className="w-4 h-4" />
                        Zobacz szczegóły
                      </Button>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Special Forever Product Card */}
              <motion.div initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            delay: 0.05
          }} className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover-lift">
                <Link to="/products/forever" className="block">
                  <div className="aspect-[4/3] relative overflow-hidden bg-secondary/30">
                    <img src={foreverCover} alt="Suplementacja na bazie natury" className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute top-3 left-3 px-3 py-1 bg-card/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
                      Suplementacja
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                      Suplementacja na bazie natury
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      Forever Living Products: napoje aloesowe, suplementy, kosmetyki, zestawy oczyszczające i wzmacniające
                    </p>
                    <div className="flex items-center justify-end">
                      <Button variant="gold" size="sm">
                        <ArrowRight className="w-4 h-4" />
                        Zobacz produkty
                      </Button>
                    </div>
                  </div>
                </Link>
              </motion.div>

              <AnimatePresence mode="popLayout">
                {products.map((product, index) => <motion.div key={product.id} layout initial={{
              opacity: 0,
              scale: 0.9
            }} animate={{
              opacity: 1,
              scale: 1
            }} exit={{
              opacity: 0,
              scale: 0.9
            }} transition={{
              delay: index * 0.05
            }} className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover-lift">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img src={product.image || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400"} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      {isAdmin && <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="warm" size="icon" onClick={() => handleEdit(product)}>
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="warm" size="icon" onClick={() => handleDelete(product.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>}
                      {product.category && <span className="absolute top-3 left-3 px-3 py-1 bg-card/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
                          {product.category}
                        </span>}
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-xl font-bold text-accent">
                          {product.price} PLN
                        </span>
                        <Button variant="outline" size="sm" onClick={() => {
                    addItem(product);
                    toast.success(`${product.name} dodano do koszyka`);
                  }}>
                          <ShoppingCart className="w-4 h-4" />
                          Do koszyka
                        </Button>
                      </div>
                    </div>
                  </motion.div>)}
              </AnimatePresence>
            </div>}

          {!isLoading && products.length === 0 && <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">Brak produktów</p>
              {isAdmin && <Button variant="gold" onClick={() => setIsAddingProduct(true)}>
                  <Plus className="w-5 h-5" />
                  Dodaj pierwszy produkt
                </Button>}
            </div>}
        </div>
      </section>
    </Layout>;
};
export default Products;