import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Plus, Trash2, X, Play, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useVideos, useAddVideo, useDeleteVideo, Video } from "@/hooks/useVideos";
import { useAuth } from "@/contexts/AuthContext";

const EASE = [0.23, 1, 0.32, 1] as const;

const C = {
  ivory:    "#F7F1E8",
  cream:    "#FDFAF5",
  parchment:"#EDE6DA",
  espresso: "#1C1610",
  body:     "rgba(28,22,16,0.62)",
  gold:     "#9C7B59",
} as const;

const Videos = () => {
  const { data: videos = [], isLoading } = useVideos();
  const addVideo = useAddVideo();
  const deleteVideo = useDeleteVideo();
  const { isAdmin, user } = useAuth();

  const [isAddingVideo, setIsAddingVideo] = useState(false);
  const [playingVideo, setPlayingVideo] = useState<Video | null>(null);
  const [formData, setFormData] = useState({ title: "", url: "", thumbnail: "", description: "" });

  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  const resetForm = () => {
    setFormData({ title: "", url: "", thumbnail: "", description: "" });
    setIsAddingVideo(false);
  };

  const convertToEmbedUrl = (url: string) => {
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
    if (!formData.title || !formData.url) return;
    addVideo.mutate({
      title: formData.title,
      url: convertToEmbedUrl(formData.url),
      thumbnail: formData.thumbnail || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400",
      description: formData.description || null,
    });
    resetForm();
  };

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
              Multimedia
            </motion.span>

            <div>
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
                Filmy
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
              className="mt-5 text-base max-w-md"
              style={{ color: C.body }}
            >
              Oglądaj materiały wideo i rozwijaj się każdego dnia
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.45, ease: EASE }}
              className="flex gap-3 mt-8"
            >
              {isAdmin && (
                <button
                  onClick={() => setIsAddingVideo(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
                  style={{ backgroundColor: C.espresso, color: "#F2E9DC" }}
                >
                  <Plus className="w-4 h-4" strokeWidth={2} />
                  Dodaj film
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

      {/* Add Video Modal */}
      <AnimatePresence>
        {isAddingVideo && isAdmin && (
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
              className="w-full max-w-md rounded-[1.6rem] p-8"
              style={{ backgroundColor: C.cream, border: `1px solid ${C.espresso}0d` }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl font-semibold" style={{ color: C.espresso }}>Dodaj film</h2>
                <button
                  onClick={resetForm}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${C.espresso}08`, color: C.espresso }}
                >
                  <X className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { label: "Tytuł *",                    key: "title",       placeholder: "Tytuł filmu",              type: "text" },
                  { label: "URL filmu (YouTube) *",      key: "url",         placeholder: "https://youtube.com/...", type: "text" },
                  { label: "URL miniaturki (opcjonalne)", key: "thumbnail",  placeholder: "https://...",             type: "text" },
                ].map(field => (
                  <div key={field.key}>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: C.espresso }}>{field.label}</label>
                    <Input
                      type={field.type}
                      value={formData[field.key as keyof typeof formData]}
                      onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: C.espresso }}>Opis</label>
                  <Textarea
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Opis filmu"
                    rows={3}
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="outline" className="flex-1" onClick={resetForm}>Anuluj</Button>
                  <Button type="submit" variant="gold" className="flex-1" disabled={addVideo.isPending}>Dodaj</Button>
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
            className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(28,22,16,0.85)" }}
            onClick={() => setPlayingVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.24, ease: EASE }}
              className="w-full max-w-4xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-end mb-3">
                <button
                  onClick={() => setPlayingVideo(null)}
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(242,233,220,0.12)", color: "#F2E9DC" }}
                >
                  <X className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>
              <div className="aspect-video rounded-2xl overflow-hidden" style={{ backgroundColor: C.espresso }}>
                <iframe
                  src={playingVideo.url}
                  title={playingVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <h3 className="font-serif text-lg font-semibold mt-4" style={{ color: "#F2E9DC" }}>
                {playingVideo.title}
              </h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid */}
      <section style={{ backgroundColor: C.cream }} className="py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          {isLoading && (
            <div className="text-center py-20 text-sm" style={{ color: C.body }}>
              Ładowanie filmów…
            </div>
          )}

          {!isLoading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {videos.map((video, i) => (
                  <motion.div
                    key={video.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.05, ease: EASE }}
                    className="group rounded-[1.6rem] overflow-hidden"
                    style={{
                      backgroundColor: C.ivory,
                      border: `1px solid ${C.espresso}0d`,
                      transition: `border-color 240ms ease, box-shadow 240ms ease`,
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = `${C.gold}44`;
                      e.currentTarget.style.boxShadow = `0 8px 32px -8px rgba(28,22,16,0.1)`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = `${C.espresso}0d`;
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div
                      className="aspect-video relative overflow-hidden cursor-pointer"
                      onClick={() => setPlayingVideo(video)}
                    >
                      <img
                        src={video.thumbnail || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400"}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ backgroundColor: "rgba(28,22,16,0.35)" }}
                      >
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "rgba(242,233,220,0.92)" }}
                        >
                          <Play className="w-6 h-6 ml-0.5" style={{ color: C.espresso, fill: C.espresso }} strokeWidth={0} />
                        </div>
                      </div>
                      {isAdmin && (
                        <button
                          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ backgroundColor: "rgba(242,233,220,0.9)", color: C.espresso }}
                          onClick={e => { e.stopPropagation(); deleteVideo.mutate(video.id); }}
                        >
                          <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif font-semibold text-base mb-1" style={{ color: C.espresso }}>
                        {video.title}
                      </h3>
                      {video.description && (
                        <p className="text-sm line-clamp-2" style={{ color: C.body }}>
                          {video.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {!isLoading && videos.length === 0 && (
            <div className="text-center py-20">
              <p className="text-sm mb-5" style={{ color: C.body }}>Brak filmów</p>
              {isAdmin && (
                <button
                  onClick={() => setIsAddingVideo(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold"
                  style={{ backgroundColor: C.espresso, color: "#F2E9DC" }}
                >
                  <Plus className="w-4 h-4" strokeWidth={2} />
                  Dodaj pierwszy film
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Videos;