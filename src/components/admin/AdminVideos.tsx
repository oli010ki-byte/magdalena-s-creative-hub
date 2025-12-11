import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit2, X, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useVideos, useAddVideo, useUpdateVideo, useDeleteVideo, Video } from "@/hooks/useVideos";
import { toast } from "sonner";

const AdminVideos = () => {
  const { data: videos = [], isLoading } = useVideos();
  const addVideo = useAddVideo();
  const updateVideo = useUpdateVideo();
  const deleteVideo = useDeleteVideo();

  const [isAddingVideo, setIsAddingVideo] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    thumbnail: "",
  });
  const [urlError, setUrlError] = useState<string | null>(null);

  const resetForm = () => {
    setFormData({ title: "", description: "", url: "", thumbnail: "" });
    setUrlError(null);
    setIsAddingVideo(false);
    setEditingVideo(null);
  };

  // Validate that URL is from a trusted video source (YouTube)
  const isValidVideoUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      const validHosts = ['youtube.com', 'www.youtube.com', 'youtu.be', 'm.youtube.com'];
      return validHosts.includes(urlObj.hostname);
    } catch {
      return false;
    }
  };

  const extractYouTubeId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    return match ? match[1] : null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUrlError(null);

    // Validate required fields
    if (!formData.title.trim()) {
      toast.error("Tytuł jest wymagany");
      return;
    }

    if (!formData.url.trim()) {
      toast.error("URL jest wymagany");
      return;
    }

    // Validate URL is from trusted source
    if (!isValidVideoUrl(formData.url)) {
      setUrlError("URL musi być linkiem do YouTube (youtube.com lub youtu.be)");
      toast.error("Nieprawidłowy URL - dozwolone tylko linki YouTube");
      return;
    }

    const videoId = extractYouTubeId(formData.url);
    if (!videoId) {
      setUrlError("Nie można rozpoznać ID filmu YouTube z podanego URL");
      toast.error("Nieprawidłowy format URL YouTube");
      return;
    }

    const thumbnail = formData.thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    const videoData = {
      title: formData.title.trim(),
      description: formData.description.trim() || null,
      url: formData.url.trim(),
      thumbnail,
    };

    if (editingVideo) {
      updateVideo.mutate({ id: editingVideo.id, ...videoData });
    } else {
      addVideo.mutate(videoData);
    }
    resetForm();
  };

  const handleEdit = (video: Video) => {
    setEditingVideo(video);
    setFormData({
      title: video.title,
      description: video.description || "",
      url: video.url,
      thumbnail: video.thumbnail || "",
    });
    setIsAddingVideo(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Czy na pewno chcesz usunąć ten film?")) {
      deleteVideo.mutate(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-xl font-semibold text-foreground">Filmy</h2>
          <p className="text-sm text-muted-foreground">
            {videos.length} filmów na stronie
          </p>
        </div>
        <Button variant="gold" onClick={() => setIsAddingVideo(true)}>
          <Plus className="w-4 h-4" />
          Dodaj film
        </Button>
      </div>

      {/* Add/Edit Modal */}
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
                  {editingVideo ? "Edytuj film" : "Dodaj film"}
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
                    URL YouTube *
                  </label>
                  <Input
                    value={formData.url}
                    onChange={(e) => {
                      setFormData({ ...formData, url: e.target.value });
                      setUrlError(null);
                    }}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className={urlError ? "border-red-500" : ""}
                  />
                  {urlError && (
                    <p className="text-sm text-red-500 mt-1">{urlError}</p>
                  )}
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
                    Miniatura (opcjonalnie)
                  </label>
                  <Input
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                    placeholder="URL miniatury (auto z YouTube)"
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" className="flex-1" onClick={resetForm}>
                    Anuluj
                  </Button>
                  <Button type="submit" variant="gold" className="flex-1" disabled={addVideo.isPending || updateVideo.isPending}>
                    {editingVideo ? "Zapisz" : "Dodaj"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Videos List */}
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Ładowanie...</p>
        </div>
      ) : videos.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-2xl border border-border/50">
          <p className="text-muted-foreground">Brak filmów</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video) => (
            <motion.div
              key={video.id}
              layout
              className="bg-card rounded-xl border border-border/50 overflow-hidden group"
            >
              <div className="aspect-video relative overflow-hidden bg-secondary/30">
                {video.thumbnail ? (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Play className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="warm" size="icon" onClick={() => handleEdit(video)}>
                    <Edit2 className="w-3 h-3" />
                  </Button>
                  <Button variant="warm" size="icon" onClick={() => handleDelete(video.id)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-foreground text-sm line-clamp-2">{video.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminVideos;
