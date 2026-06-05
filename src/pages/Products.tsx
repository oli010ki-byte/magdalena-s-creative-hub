import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
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

const EASE = [0.23, 1, 0.32, 1] as const;

const C = {
  ivory:    "#F7F1E8",
  cream:    "#FDFAF5",
  parchment:"#EDE6DA",
  espresso: "#1C1610",
  body:     "rgba(28,22,16,0.62)",
  gold:     "#9C7B59",
} as const;

const Products = () => {
  const { data: products = [], isLoading } = useProducts();
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const { isAdmin, user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addItem } = useCartStore();

  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "", price: "", image: "", category: "" });

  const resetForm = () => {
    setFormData({ name: "", description: "", price: "", image: "", category: "" });
    setIsAddingProduct(false);
    setEditingProduct(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { toast.error("Proszę wybrać plik obrazu"); return; }
    setIsUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const { error } = await supabase.storage.from("product-images").upload(fileName, file);
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from("product-images").getPublicUrl(fileName);
      setFormData({ ...formData, image: publicUrl });
      toast.success("Zdjęcie zostało przesłane");
    } catch {
      toast.error("Błąd podczas przesyłania zdjęcia");
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
    setFormData({ name: product.name, description: product.description || "", price: product.price.toString(), image: product.image || "", category: product.category || "" });
    setIsAddingProduct(true);
  };

  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];

  return (
    <Layout>
      {/* Header */}
      <section style={{ backgroundColor: C.ivory }} className="pt-20 pb-16 lg:pt-28 lg:pb-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div ref={heroRef}>
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: EASE }}
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] px-4 py-1.5 rounded-full mb-8"
              style={{ backgroundColor: `${C.gold}18`, color: C.gold }}
            >
              Sklep
            </motion.span>

            <div className="overflow-hidden">
              <motion.h1
                variants={{
                  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
                  show:   { clipPath: "inset(0 0 -40% 0)", opacity: 1, transition: { duration: 0.95, ease: EASE } },
                }}
                initial="hidden"
                animate={heroInView ? "show" : "hidden"}
                className="font-serif font-bold tracking-[-0.02em] leading-[1.05]"
                style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)", color: C.espresso }}
              >
                Produkty
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
              className="mt-5 text-base max-w-md"
              style={{ color: C.body }}
            >
              Kursy, e-booki i usługi wspierające Twoją transformację
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.45, ease: EASE }}
              className="flex gap-3 mt-8"
            >
              {isAdmin && (
                <button
                  onClick={() => setIsAddingProduct(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
                  style={{ backgroundColor: C.espresso, color: "#F2E9DC" }}
                >
                  <Plus className="w-4 h-4" strokeWidth={2} />
                  Dodaj produkt
                </button>
              )}
              {!user && (
                <Link
                  to="/auth"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border"
                  style={{ borderColor: `${C.espresso}22`, color: C.espresso }}
                >
                  <LogIn className="w-4 h-4" strokeWidth={1.5} />
                  Panel admina
                </Link>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Add/Edit Product Modal */}
      <AnimatePresence>
        {isAddingProduct && isAdmin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(28,22,16,0.4)" }}
            onClick={e => e.target === e.currentTarget && resetForm()}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="w-full max-w-md rounded-[1.6rem] p-8 max-h-[90vh] overflow-y-auto"
              style={{ backgroundColor: C.cream, border: `1px solid ${C.espresso}0d` }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl font-semibold" style={{ color: C.espresso }}>
                  {editingProduct ? "Edytuj produkt" : "Dodaj produkt"}
                </h2>
                <button
                  onClick={resetForm}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${C.espresso}08`, color: C.espresso }}
                >
                  <X className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: C.espresso }}>Nazwa *</label>
                  <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Nazwa produktu" />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: C.espresso }}>Opis</label>
                  <Textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Opis produktu" rows={3} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: C.espresso }}>Cena (PLN) *</label>
                    <Input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} placeholder="0" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: C.espresso }}>Kategoria</label>
                    <Input value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} placeholder="np. Kursy" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: C.espresso }}>Zdjęcie produktu</label>
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                  {formData.image ? (
                    <div className="relative">
                      <img src={formData.image} alt="Podgląd" className="w-full h-40 object-cover rounded-xl" style={{ border: `1px solid ${C.espresso}0d` }} />
                      <div className="absolute top-2 right-2 flex gap-2">
                        <Button type="button" variant="warm" size="icon" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button type="button" variant="warm" size="icon" onClick={() => setFormData({ ...formData, image: "" })}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="w-full h-40 rounded-xl flex flex-col items-center justify-center gap-2 border-2 border-dashed"
                      style={{ borderColor: `${C.espresso}18`, color: C.body }}
                    >
                      {isUploading ? (
                        <span className="text-sm animate-pulse">Przesyłanie…</span>
                      ) : (
                        <>
                          <Upload className="w-7 h-7" strokeWidth={1.5} />
                          <span className="text-sm">Kliknij, aby dodać zdjęcie</span>
                        </>
                      )}
                    </button>
                  )}
                  <p className="text-xs mt-2 mb-1" style={{ color: C.body }}>lub wklej URL zdjęcia:</p>
                  <Input value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} placeholder="https://…" />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="outline" className="flex-1" onClick={resetForm}>Anuluj</Button>
                  <Button type="submit" variant="gold" className="flex-1" disabled={addProduct.isPending || updateProduct.isPending || isUploading}>
                    {editingProduct ? "Zapisz" : "Dodaj"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Products */}
      <section style={{ backgroundColor: C.cream }} className="py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          {/* Category filter */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {categories.map((cat, i) => (
                <span
                  key={`${cat}-${i}`}
                  className="px-4 py-1.5 rounded-full text-sm font-medium"
                  style={{ backgroundColor: `${C.gold}14`, color: C.gold }}
                >
                  {cat as string}
                </span>
              ))}
            </div>
          )}

          {isLoading && (
            <div className="text-center py-20 text-sm" style={{ color: C.body }}>
              Ładowanie produktów…
            </div>
          )}

          {!isLoading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Consultation card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease: EASE }}
                className="group rounded-[1.6rem] overflow-hidden"
                style={{
                  backgroundColor: C.ivory,
                  border: `1px solid ${C.espresso}0d`,
                  transition: `border-color 240ms ease, box-shadow 240ms ease`,
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${C.gold}44`; e.currentTarget.style.boxShadow = `0 12px 40px -12px rgba(28,22,16,0.12)`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = `${C.espresso}0d`; e.currentTarget.style.boxShadow = "none"; }}
              >
                <Link to="/products/consultation" className="block">
                  <div className="aspect-[4/3] relative overflow-hidden" style={{ backgroundColor: C.parchment }}>
                    <img src={consultationCover} alt="Konsultacja 1:1" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm" style={{ backgroundColor: "rgba(253,250,245,0.88)", color: C.espresso }}>Mentoring 1:1</span>
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: C.parchment, color: C.espresso }}>160 zł</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif font-semibold text-lg mb-1" style={{ color: C.espresso }}>Konsultacja 1:1</h3>
                    <p className="text-sm mb-4 line-clamp-2" style={{ color: C.body }}>Indywidualny mentoring — strategia dopasowana do Twoich potrzeb</p>
                    <div className="flex items-center justify-end">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: C.gold }}>
                        <Calendar className="w-3.5 h-3.5" strokeWidth={2} />
                        Zobacz szczegóły
                        <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Forever card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, ease: EASE }}
                className="group rounded-[1.6rem] overflow-hidden"
                style={{
                  backgroundColor: C.ivory,
                  border: `1px solid ${C.espresso}0d`,
                  transition: `border-color 240ms ease, box-shadow 240ms ease`,
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${C.gold}44`; e.currentTarget.style.boxShadow = `0 12px 40px -12px rgba(28,22,16,0.12)`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = `${C.espresso}0d`; e.currentTarget.style.boxShadow = "none"; }}
              >
                <Link to="/products/forever" className="block">
                  <div className="aspect-[4/3] relative overflow-hidden" style={{ backgroundColor: C.parchment }}>
                    <img src={foreverCover} alt="Suplementacja FOREVER" className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm" style={{ backgroundColor: "rgba(253,250,245,0.88)", color: C.espresso }}>Suplementacja</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif font-semibold text-lg mb-1" style={{ color: C.espresso }}>Suplementacja na bazie natury</h3>
                    <p className="text-sm mb-4 line-clamp-2" style={{ color: C.body }}>Forever Living Products: napoje aloesowe, suplementy, kosmetyki i zestawy</p>
                    <div className="flex items-center justify-end">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: C.gold }}>
                        Zobacz produkty
                        <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Dynamic products */}
              <AnimatePresence mode="popLayout">
                {products.map((product, i) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: (i + 2) * 0.05, ease: EASE }}
                    className="group rounded-[1.6rem] overflow-hidden"
                    style={{
                      backgroundColor: C.ivory,
                      border: `1px solid ${C.espresso}0d`,
                      transition: `border-color 240ms ease, box-shadow 240ms ease`,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${C.gold}44`; e.currentTarget.style.boxShadow = `0 12px 40px -12px rgba(28,22,16,0.12)`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = `${C.espresso}0d`; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    <div className="aspect-[4/3] relative overflow-hidden" style={{ backgroundColor: C.parchment }}>
                      <img
                        src={product.image || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400"}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {isAdmin && (
                        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="warm" size="icon" onClick={() => handleEdit(product)}>
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="warm" size="icon" onClick={() => deleteProduct.mutate(product.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                      {product.category && (
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm" style={{ backgroundColor: "rgba(253,250,245,0.88)", color: C.espresso }}>
                          {product.category}
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif font-semibold text-lg mb-1" style={{ color: C.espresso }}>{product.name}</h3>
                      <p className="text-sm mb-4 line-clamp-2" style={{ color: C.body }}>{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-xl" style={{ color: C.espresso }}>
                          {product.price} PLN
                        </span>
                        <button
                          onClick={() => { addItem(product); toast.success(`${product.name} dodano do koszyka`); }}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border"
                          style={{
                            borderColor: `${C.espresso}22`,
                            color: C.espresso,
                            transition: `border-color 160ms ease`,
                          }}
                          onMouseEnter={e => (e.currentTarget.style.borderColor = `${C.espresso}44`)}
                          onMouseLeave={e => (e.currentTarget.style.borderColor = `${C.espresso}22`)}
                        >
                          <ShoppingCart className="w-3.5 h-3.5" strokeWidth={1.5} />
                          Do koszyka
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {!isLoading && products.length === 0 && (
            <div className="text-center py-20">
              <p className="text-sm mb-5" style={{ color: C.body }}>Brak produktów</p>
              {isAdmin && (
                <button
                  onClick={() => setIsAddingProduct(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold"
                  style={{ backgroundColor: C.espresso, color: "#F2E9DC" }}
                >
                  <Plus className="w-4 h-4" strokeWidth={2} />
                  Dodaj pierwszy produkt
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Products;