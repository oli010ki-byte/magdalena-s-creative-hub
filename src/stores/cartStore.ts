import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/hooks/useProducts";

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentMethod = "cash_on_delivery" | "bank_transfer" | "consultation";

export interface ShippingAddress {
  fullName: string;
  street: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  paymentMethod: PaymentMethod | null;
  shippingAddress: ShippingAddress;
  consultationMessage: string;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setShippingAddress: (address: Partial<ShippingAddress>) => void;
  setConsultationMessage: (message: string) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const initialShippingAddress: ShippingAddress = {
  fullName: "",
  street: "",
  city: "",
  postalCode: "",
  phone: "",
  email: "",
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      paymentMethod: null,
      shippingAddress: initialShippingAddress,
      consultationMessage: "",

      addItem: (product) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return { items: [...state.items, { product, quantity: 1 }] };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({
          items: [],
          paymentMethod: null,
          shippingAddress: initialShippingAddress,
          consultationMessage: "",
        });
      },

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      setPaymentMethod: (method) => set({ paymentMethod: method }),

      setShippingAddress: (address) =>
        set((state) => ({
          shippingAddress: { ...state.shippingAddress, ...address },
        })),

      setConsultationMessage: (message) => set({ consultationMessage: message }),

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        items: state.items,
        shippingAddress: state.shippingAddress,
      }),
    }
  )
);
