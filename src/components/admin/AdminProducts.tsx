import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit2, X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useProducts, useAddProduct, useUpdateProduct, useDeleteProduct, Product } from "@/hooks/useProducts";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AdminProducts = () => {
  const { data: products = [], isLoading } = useProducts();
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });

  const resetForm = () => {
    setFormData({ name: "", description: "", price: "", image: "", category: "" });
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
      
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

      setFormData({ ...formData, image: publicUrl });
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
      category: formData.category || null,
    };

    if (editingProduct) {
      updateProduct.mutate({ id: editingProduct.id, ...productData });
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
      category: product.category || "",
    });
    setIsAddingProduct(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Czy na pewno chcesz usunąć ten produkt?")) {
      deleteProduct.mutate(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-xl font-semibold text-foreground">Produkty</h2>
          <p className="text-sm text-muted-foreground">
            {products.length} produktów w sklepie
          </p>
        </div>
        <Button variant="gold" onClick={() => setIsAddingProduct(true)}>
          <Plus className="w-4 h-4" />
          Dodaj produkt
        </Button>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isAddingProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && resetForm()}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card rounded-2xl p-6 w-full max-w-md border border-border shadow-card max-h-[90vh] overflow-y-auto"
            >
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
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nazwa produktu"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">
                    Opis
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Opis produktu"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">
                      Cena (PLN) *
                    </label>
                    <Input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">
                      Kategoria
                    </label>
                    <Input
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="np. Kursy"
                    />
                  </div>
                </div>
                
                {/* Image Upload */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Zdjęcie produktu
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  
                  {formData.image ? (
                    <div className="relative">
                      <img
                        src={formData.image}
                        alt="Podgląd"
                        className="w-full h-40 object-cover rounded-lg border border-border"
                      />
                      <div className="absolute top-2 right-2 flex gap-2">
                        <Button
                          type="button"
                          variant="warm"
                          size="icon"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isUploading}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="warm"
                          size="icon"
                          onClick={() => setFormData({ ...formData, image: "" })}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="w-full h-40 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 hover:border-soft-gold hover:bg-soft-gold/5 transition-colors"
                    >
                      {isUploading ? (
                        <div className="animate-pulse text-muted-foreground">
                          Przesyłanie...
                        </div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            Kliknij, aby dodać zdjęcie
                          </span>
                        </>
                      )}
                    </button>
                  )}
                  
                  <p className="text-xs text-muted-foreground mt-2">
                    lub wklej URL zdjęcia:
                  </p>
                  <Input
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://..."
                    className="mt-1"
                  />
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Products List */}
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Ładowanie...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-2xl border border-border/50">
          <p className="text-muted-foreground">Brak produktów</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <motion.div
              key={product.id}
              layout
              className="bg-card rounded-xl border border-border/50 overflow-hidden group"
            >
              <div className="aspect-video relative overflow-hidden bg-secondary/30">
                <img
                  src={product.image || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="warm" size="icon" onClick={() => handleEdit(product)}>
                    <Edit2 className="w-3 h-3" />
                  </Button>
                  <Button variant="warm" size="icon" onClick={() => handleDelete(product.id)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-medium text-foreground text-sm">{product.name}</h3>
                    {product.category && (
                      <span className="text-xs text-muted-foreground">{product.category}</span>
                    )}
                  </div>
                  <span className="font-semibold text-accent text-sm">{product.price} PLN</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
