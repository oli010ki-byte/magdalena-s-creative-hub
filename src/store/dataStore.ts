import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  description: string;
}

interface DataStore {
  products: Product[];
  videos: Video[];
  addProduct: (product: Omit<Product, "id">) => void;
  removeProduct: (id: string) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  addVideo: (video: Omit<Video, "id">) => void;
  removeVideo: (id: string) => void;
}

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Kurs Me2Me Premium",
    description: "Pełny dostęp do kursu rozwoju osobistego z aplikacją Me2Me",
    price: 299,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400",
    category: "Kursy",
  },
  {
    id: "2",
    name: "E-book: Twój Dziennik",
    description: "Elektroniczna wersja dziennika do pracy z sobą",
    price: 49,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
    category: "E-booki",
  },
  {
    id: "3",
    name: "Konsultacja 1:1",
    description: "Indywidualna sesja coachingowa online",
    price: 199,
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400",
    category: "Usługi",
  },
];

const initialVideos: Video[] = [
  {
    id: "1",
    title: "Wprowadzenie do Me2Me",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400",
    description: "Poznaj podstawy aplikacji Me2Me",
  },
];

export const useDataStore = create<DataStore>()(
  persist(
    (set) => ({
      products: initialProducts,
      videos: initialVideos,
      addProduct: (product) =>
        set((state) => ({
          products: [...state.products, { ...product, id: Date.now().toString() }],
        })),
      removeProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
      updateProduct: (id, product) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...product } : p
          ),
        })),
      addVideo: (video) =>
        set((state) => ({
          videos: [...state.videos, { ...video, id: Date.now().toString() }],
        })),
      removeVideo: (id) =>
        set((state) => ({
          videos: state.videos.filter((v) => v.id !== id),
        })),
    }),
    {
      name: "mz-data-store",
    }
  )
);
