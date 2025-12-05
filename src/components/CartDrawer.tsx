import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Minus, Plus, Trash2, CreditCard, Truck, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCartStore, PaymentMethod } from "@/stores/cartStore";
import { toast } from "sonner";

const CartDrawer = () => {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getTotalPrice,
    paymentMethod,
    setPaymentMethod,
    shippingAddress,
    setShippingAddress,
    consultationMessage,
    setConsultationMessage,
    clearCart,
  } = useCartStore();

  const [step, setStep] = useState<"cart" | "checkout" | "consultation">("cart");

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Koszyk jest pusty");
      return;
    }
    
    // Check if any item is a consultation
    const hasConsultation = items.some(
      (item) => item.product.category?.toLowerCase().includes("konsultacja")
    );
    
    if (hasConsultation && items.length === 1) {
      setStep("consultation");
    } else {
      setStep("checkout");
    }
  };

  const handlePlaceOrder = () => {
    if (!paymentMethod) {
      toast.error("Wybierz metodę płatności");
      return;
    }
    
    const { fullName, street, city, postalCode, phone, email } = shippingAddress;
    if (!fullName || !street || !city || !postalCode || !phone || !email) {
      toast.error("Wypełnij wszystkie pola adresu dostawy");
      return;
    }

    // Here you would send the order to your backend
    const orderDetails = {
      items: items.map((i) => ({ name: i.product.name, qty: i.quantity, price: i.product.price })),
      total: getTotalPrice(),
      paymentMethod,
      shippingAddress,
    };

    console.log("Order placed:", orderDetails);
    
    toast.success("Zamówienie zostało złożone! Skontaktujemy się wkrótce.");
    clearCart();
    setStep("cart");
    closeCart();
  };

  const handleSendConsultation = () => {
    if (!consultationMessage.trim()) {
      toast.error("Wpisz wiadomość");
      return;
    }
    
    const { fullName, email, phone } = shippingAddress;
    if (!fullName || !email) {
      toast.error("Podaj imię i email");
      return;
    }

    // Here you would send the consultation request
    const consultationDetails = {
      items: items.map((i) => ({ name: i.product.name })),
      message: consultationMessage,
      contact: { fullName, email, phone },
    };

    console.log("Consultation request:", consultationDetails);

    toast.success("Wiadomość została wysłana! Magda skontaktuje się z Tobą wkrótce.");
    clearCart();
    setStep("cart");
    closeCart();
  };

  const paymentMethods: { id: PaymentMethod; label: string; icon: React.ReactNode; description: string }[] = [
    {
      id: "cash_on_delivery",
      label: "Za pobraniem",
      icon: <Truck className="w-5 h-5" />,
      description: "Płatność przy odbiorze przesyłki",
    },
    {
      id: "bank_transfer",
      label: "Przelew bankowy",
      icon: <CreditCard className="w-5 h-5" />,
      description: "Dane do przelewu otrzymasz emailem",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-accent" />
                <h2 className="font-serif text-lg font-semibold text-foreground">
                  {step === "cart" && "Koszyk"}
                  {step === "checkout" && "Zamówienie"}
                  {step === "consultation" && "Konsultacja"}
                </h2>
              </div>
              <Button variant="ghost" size="icon" onClick={closeCart}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {step === "cart" && (
                <>
                  {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Twój koszyk jest pusty</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex gap-3 p-3 bg-secondary/50 rounded-xl"
                        >
                          <img
                            src={item.product.image || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100"}
                            alt={item.product.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-foreground truncate">
                              {item.product.name}
                            </h3>
                            <p className="text-sm text-accent font-semibold">
                              {item.product.price} PLN
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center text-sm font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 ml-auto text-destructive"
                                onClick={() => removeItem(item.product.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {step === "checkout" && (
                <div className="space-y-6">
                  {/* Order Summary */}
                  <div>
                    <h3 className="font-serif text-sm font-semibold text-foreground mb-3">
                      Podsumowanie
                    </h3>
                    <div className="space-y-2 text-sm">
                      {items.map((item) => (
                        <div key={item.product.id} className="flex justify-between">
                          <span className="text-muted-foreground">
                            {item.product.name} x{item.quantity}
                          </span>
                          <span className="font-medium">
                            {item.product.price * item.quantity} PLN
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h3 className="font-serif text-sm font-semibold text-foreground mb-3">
                      Metoda płatności
                    </h3>
                    <div className="space-y-2">
                      {paymentMethods.map((method) => (
                        <button
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                            paymentMethod === method.id
                              ? "border-accent bg-accent/10"
                              : "border-border hover:border-accent/50"
                          }`}
                        >
                          <div className={`${paymentMethod === method.id ? "text-accent" : "text-muted-foreground"}`}>
                            {method.icon}
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-foreground">{method.label}</p>
                            <p className="text-xs text-muted-foreground">{method.description}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <h3 className="font-serif text-sm font-semibold text-foreground mb-3">
                      Adres dostawy
                    </h3>
                    <div className="space-y-3">
                      <Input
                        placeholder="Imię i nazwisko *"
                        value={shippingAddress.fullName}
                        onChange={(e) => setShippingAddress({ fullName: e.target.value })}
                      />
                      <Input
                        placeholder="Email *"
                        type="email"
                        value={shippingAddress.email}
                        onChange={(e) => setShippingAddress({ email: e.target.value })}
                      />
                      <Input
                        placeholder="Telefon *"
                        value={shippingAddress.phone}
                        onChange={(e) => setShippingAddress({ phone: e.target.value })}
                      />
                      <Input
                        placeholder="Ulica i numer *"
                        value={shippingAddress.street}
                        onChange={(e) => setShippingAddress({ street: e.target.value })}
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          placeholder="Kod pocztowy *"
                          value={shippingAddress.postalCode}
                          onChange={(e) => setShippingAddress({ postalCode: e.target.value })}
                        />
                        <Input
                          placeholder="Miasto *"
                          value={shippingAddress.city}
                          onChange={(e) => setShippingAddress({ city: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === "consultation" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 p-4 bg-accent/10 rounded-xl">
                    <MessageCircle className="w-8 h-8 text-accent" />
                    <div>
                      <p className="font-medium text-foreground">Konsultacja 1:1</p>
                      <p className="text-sm text-muted-foreground">
                        Napisz wiadomość, a Magda skontaktuje się z Tobą
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Input
                      placeholder="Imię i nazwisko *"
                      value={shippingAddress.fullName}
                      onChange={(e) => setShippingAddress({ fullName: e.target.value })}
                    />
                    <Input
                      placeholder="Email *"
                      type="email"
                      value={shippingAddress.email}
                      onChange={(e) => setShippingAddress({ email: e.target.value })}
                    />
                    <Input
                      placeholder="Telefon (opcjonalnie)"
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress({ phone: e.target.value })}
                    />
                    <Textarea
                      placeholder="Napisz wiadomość do Magdy... *"
                      rows={5}
                      value={consultationMessage}
                      onChange={(e) => setConsultationMessage(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border space-y-3">
              {step === "cart" && items.length > 0 && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Suma</span>
                    <span className="font-serif text-xl font-bold text-accent">
                      {getTotalPrice()} PLN
                    </span>
                  </div>
                  <Button variant="gold" className="w-full" onClick={handleCheckout}>
                    Przejdź do zamówienia
                  </Button>
                </>
              )}

              {step === "checkout" && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Do zapłaty</span>
                    <span className="font-serif text-xl font-bold text-accent">
                      {getTotalPrice()} PLN
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => setStep("cart")}>
                      Wróć
                    </Button>
                    <Button variant="gold" className="flex-1" onClick={handlePlaceOrder}>
                      Zamawiam
                    </Button>
                  </div>
                </>
              )}

              {step === "consultation" && (
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => setStep("cart")}>
                    Wróć
                  </Button>
                  <Button variant="gold" className="flex-1" onClick={handleSendConsultation}>
                    <Send className="w-4 h-4 mr-2" />
                    Wyślij
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
