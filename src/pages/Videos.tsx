import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, X, Play } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDataStore, Video } from "@/store/dataStore";
import { toast } from "@/hooks/use-toast";

const Videos = () => {
  const { videos, addVideo, removeVideo } = useDataStore();
  const [isAddingVideo, setIsAddingVideo] = useState(false);
  const [playingVideo, setPlayingVideo] = useState<Video | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    thumbnail: "",
    description: "",
  });

  const resetForm = () => {
    setFormData({ title: "", url: "", thumbnail: "", description: "" });
    setIsAddingVideo(false);
  };

  const convertToEmbedUrl = (url: string) => {
    // Convert YouTube watch URL to embed URL
    if (url.includes("youtube.com/watch?v=")) {
      const videoId = url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.url) {
      toast({ title: "Wypełnij wymagane pola", variant: "destructive" });
      return;
    }

    addVideo({
      ...formData,
      url: convertToEmbedUrl(formData.url),
      thumbnail: formData.thumbnail || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400",
    });
    toast({ title: "Film dodany!" });
    resetForm();
  };

  const handleDelete = (id: string) => {
    removeVideo(id);
    toast({ title: "Film usunięty" });
  };

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
              Multimedia
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6">
              Filmy
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Oglądaj materiały wideo i rozwijaj się każdego dnia
            </p>
            <Button variant="gold" onClick={() => setIsAddingVideo(true)}>
              <Plus className="w-5 h-5" />
              Dodaj film
            </Button>
          </motion.div>

          {/* Add Video Modal */}
          <AnimatePresence>
            {isAddingVideo && (
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
                      Dodaj film
                    </h2>
                    <Button variant="ghost" size="icon" onClick={resetForm}>
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">
                        Tytuł *
                      </label>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Tytuł filmu"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">
                        URL filmu (YouTube) *
                      </label>
                      <Input
                        value={formData.url}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        placeholder="https://youtube.com/watch?v=..."
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">
                        Opis
                      </label>
                      <Textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Opis filmu"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">
                        URL miniaturki (opcjonalne)
                      </label>
                      <Input
                        value={formData.thumbnail}
                        onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button type="button" variant="outline" className="flex-1" onClick={resetForm}>
                        Anuluj
                      </Button>
                      <Button type="submit" variant="gold" className="flex-1">
                        Dodaj
                      </Button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Video Player Modal */}
          <AnimatePresence>
            {playingVideo && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-foreground/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setPlayingVideo(null)}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="w-full max-w-4xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-end mb-4">
                    <Button variant="ghost" size="icon" onClick={() => setPlayingVideo(null)} className="text-primary-foreground hover:bg-background/20">
                      <X className="w-6 h-6" />
                    </Button>
                  </div>
                  <div className="aspect-video rounded-2xl overflow-hidden bg-card">
                    <iframe
                      src={playingVideo.url}
                      title={playingVideo.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-primary-foreground mt-4">
                    {playingVideo.title}
                  </h3>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Videos Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover-lift"
                >
                  <div
                    className="aspect-video relative overflow-hidden cursor-pointer"
                    onClick={() => setPlayingVideo(video)}
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-card/90 flex items-center justify-center">
                        <Play className="w-8 h-8 text-accent fill-accent" />
                      </div>
                    </div>
                    <Button
                      variant="warm"
                      size="icon"
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(video.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                      {video.title}
                    </h3>
                    {video.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {video.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {videos.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">Brak filmów</p>
              <Button variant="gold" onClick={() => setIsAddingVideo(true)}>
                <Plus className="w-5 h-5" />
                Dodaj pierwszy film
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Videos;
