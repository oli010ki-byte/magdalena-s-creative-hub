import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail: string | null;
  description: string | null;
  created_at: string;
}

export const useVideos = () => {
  return useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("videos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Video[];
    },
  });
};

export const useAddVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (video: Omit<Video, "id" | "created_at">) => {
      const { data, error } = await supabase
        .from("videos")
        .insert([video])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
      toast({ title: "Film dodany!" });
    },
    onError: (error: Error) => {
      toast({ title: "Błąd podczas dodawania filmu", description: error.message, variant: "destructive" });
    },
  });
};

export const useUpdateVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...video }: Partial<Video> & { id: string }) => {
      const { data, error } = await supabase
        .from("videos")
        .update(video)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
      toast({ title: "Film zaktualizowany!" });
    },
    onError: (error: Error) => {
      toast({ title: "Błąd podczas aktualizacji", description: error.message, variant: "destructive" });
    },
  });
};

export const useDeleteVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("videos").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
      toast({ title: "Film usunięty" });
    },
    onError: (error: Error) => {
      toast({ title: "Błąd podczas usuwania", description: error.message, variant: "destructive" });
    },
  });
};
