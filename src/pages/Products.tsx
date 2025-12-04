import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit2, X, ShoppingCart } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDataStore, Product } from "@/store/dataStore";
import { toast } from "@/hooks/use-toast";

const Products = () => {
  const { products, addProduct, removeProduct, updateProduct } = useDataStore();
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      toast({ title: "Wypełnij wymagane pola", variant: "destructive" });
      return;
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        ...formData,
        price: parseFloat(formData.price),
      });
      toast({ title: "Produkt zaktualizowany!" });
    } else {
      addProduct({
        ...formData,
        price: parseFloat(formData.price),
        image: formData.image || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400",
      });
      toast({ title: "Produkt dodany!" });
    }
    resetForm();
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image: product.image,
      category: product.category,
    });
    setIsAddingProduct(true);
  };

  const handleDelete = (id: string) => {
    removeProduct(id);
    toast({ title: "Produkt usunięty" });
  };

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="inline-block text-sm font-medium text-soft-gold mb-4">
              Sklep
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6">
              Produkty
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Kursy, e-booki i usługi wspierające Twoją transformację
            </p>
            <Button
              variant="gold"
              onClick={() => setIsAddingProduct(true)}
            >
              <Plus className="w-5 h-5" />
              Dodaj produkt
            </Button>
          </motion.div>

          {/* Add/Edit Product Modal */}
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
                  className="bg-card rounded-2xl p-6 w-full max-w-md border border-border shadow-card"
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
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">
                        URL zdjęcia
                      </label>
                      <Input
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button type="button" variant="outline" className="flex-1" onClick={resetForm}>
                        Anuluj
                      </Button>
                      <Button type="submit" variant="gold" className="flex-1">
                        {editingProduct ? "Zapisz" : "Dodaj"}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Categories Filter */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mb-12">
              {categories.map((category, index) => (
                <span
                  key={`${category}-${index}`}
                  className="px-4 py-2 bg-secondary rounded-full text-sm text-secondary-foreground"
                >
                  {category as string}
                </span>
              ))}
            </div>
          )}

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover-lift"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="warm"
                        size="icon"
                        onClick={() => handleEdit(product)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="warm"
                        size="icon"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    {product.category && (
                      <span className="absolute top-3 left-3 px-3 py-1 bg-card/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
                        {product.category}
                      </span>
                    )}
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
                      <Button variant="outline" size="sm">
                        <ShoppingCart className="w-4 h-4" />
                        Kup
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {products.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">Brak produktów</p>
              <Button variant="gold" onClick={() => setIsAddingProduct(true)}>
                <Plus className="w-5 h-5" />
                Dodaj pierwszy produkt
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Products;
