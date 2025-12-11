import { useState } from "react";
import { motion } from "framer-motion";
import { Package, Video, User, Settings, LogOut, ExternalLink, Shield } from "lucide-react";
import { Navigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import AdminProducts from "@/components/admin/AdminProducts";
import AdminVideos from "@/components/admin/AdminVideos";
import AdminProfile from "@/components/admin/AdminProfile";

const Admin = () => {
  const { isAdmin, user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("products");

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    return (
      <Layout>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center">
              <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-destructive" />
              </div>
              <h1 className="font-serif text-2xl font-bold text-foreground mb-4">
                Brak dostępu
              </h1>
              <p className="text-muted-foreground mb-6">
                Nie masz uprawnień do panelu administracyjnego.
              </p>
              <Button asChild variant="outline">
                <Link to="/">Wróć na stronę główną</Link>
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="inline-block text-sm font-medium text-soft-gold mb-2">
                  Panel administracyjny
                </span>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                  Zarządzanie stroną
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground hidden sm:block">
                  {user.email}
                </span>
                <Button variant="outline" size="sm" onClick={signOut}>
                  <LogOut className="w-4 h-4" />
                  Wyloguj
                </Button>
              </div>
            </div>
            
            <p className="text-muted-foreground max-w-2xl">
              Zarządzaj produktami, filmami i profilem z jednego miejsca. Aplikacja Me2Me jest płatna - 
              dostęp można zakupić kontaktując się z Magdaleną.
            </p>
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="bg-card border border-border/50 p-1 h-auto flex-wrap">
              <TabsTrigger 
                value="products" 
                className="gap-2 data-[state=active]:bg-soft-gold/20 data-[state=active]:text-foreground"
              >
                <Package className="w-4 h-4" />
                <span className="hidden sm:inline">Produkty</span>
              </TabsTrigger>
              <TabsTrigger 
                value="videos" 
                className="gap-2 data-[state=active]:bg-soft-gold/20 data-[state=active]:text-foreground"
              >
                <Video className="w-4 h-4" />
                <span className="hidden sm:inline">Filmy</span>
              </TabsTrigger>
              <TabsTrigger 
                value="profile" 
                className="gap-2 data-[state=active]:bg-soft-gold/20 data-[state=active]:text-foreground"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Profil & Kontakt</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="mt-0">
              <AdminProducts />
            </TabsContent>

            <TabsContent value="videos" className="mt-0">
              <AdminVideos />
            </TabsContent>

            <TabsContent value="profile" className="mt-0">
              <AdminProfile />
            </TabsContent>
          </Tabs>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12 p-6 bg-card rounded-2xl border border-border/50"
          >
            <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
              Szybkie linki
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link to="/products">
                  <ExternalLink className="w-4 h-4" />
                  Zobacz sklep
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/videos">
                  <ExternalLink className="w-4 h-4" />
                  Zobacz filmy
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://www.me2me.pl/login" target="_blank" rel="noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  Aplikacja Me2Me
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://linktr.ee/magdapassionforever" target="_blank" rel="noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  Linktree
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Admin;
