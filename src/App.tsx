import { useState, useEffect, useRef, MouseEvent, ReactNode } from "react";
import {
  Trash2,
  MapPin,
  ChevronRight,
  ChevronLeft,
  X,
  Phone,
  Printer,
  Globe,
  ExternalLink
} from "lucide-react";

import galleryData from "./data/gallery.json";
// @ts-ignore
import ctsLogo from "../image/logo_cts.png";
// @ts-ignore
import asalLogo from "../image/logo_asal.jpg";
// @ts-ignore
import accueilImage from "./assets/images/accueil_mechouar.png";

// Galerie avec les miniatures réelles de la visite virtuelle
interface GalleryImage {
  id: string;
  src: string;
  title: string;
  category: string;
  description: string;
  location: string;
  date: string;
  photographer: string;
}



function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}>
      {children}
    </div>
  );
}

// MAIN COMPONENT
export default function App() {
  const [activeTab, setActiveTab] = useState<"home" | "gallery" | "360" | "pointcloud">("home");
  const [galleryItems, setGalleryItems] = useState<GalleryImage[]>(galleryData as GalleryImage[]);
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");

  const scanVideos = [
    { url: "https://archive.org/download/exterieur-el-mechouar/exterieur%20El%20Mechouar.mp4", label: "Extérieur El Mechouar" },
    { url: "https://archive.org/download/exterieur-el-mechouar/interieur%20El%20Mechouar.mp4", label: "Intérieur El Mechouar" },
    { url: "https://archive.org/download/exterieur-el-mechouar/interieur%20Sidi%20Boumediene.mp4", label: "Intérieur Sidi Boumediene" },
  ];
  const [selectedVideo, setSelectedVideo] = useState<string>(scanVideos[0].url);

  useEffect(() => {
    // Elegant system initialization message
    console.log("Projet Patrimoine CTS - Mosquée El Mechouar Initialisé.");
  }, []);

  // Filter gallery items by category
  const categories = ["Tous", "Intérieur", "Extérieur", "Souterrain"];
  const filteredGallery = galleryItems.filter(
    (item) => selectedCategory === "Tous" || item.category === selectedCategory
  );

  const deleteGalleryItem = (id: string, e: MouseEvent) => {
    e.stopPropagation(); // prevent opening lightbox
    setGalleryItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Switch to next/prev in Lightbox
  const handleNextLightbox = () => {
    if (!lightboxImage) return;
    const currentIndex = galleryItems.findIndex((img) => img.id === lightboxImage.id);
    const nextIndex = (currentIndex + 1) % galleryItems.length;
    setLightboxImage(galleryItems[nextIndex]);
  };

  const handlePrevLightbox = () => {
    if (!lightboxImage) return;
    const currentIndex = galleryItems.findIndex((img) => img.id === lightboxImage.id);
    const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    setLightboxImage(galleryItems[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans overflow-x-hidden selection:bg-amber-500 selection:text-slate-900">
      
      {/* GLASSMORPHIC NAVIGATION HEADER BAR */}
      <header id="header-bar" className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-amber-900/20 py-3.5 px-4 md:px-8 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Logos CTS + ASAL */}
          <div id="cts-brand" className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("home")}>
            <img src={ctsLogo} alt="Logo CTS" className="h-14 w-auto object-contain" />
            <img src={asalLogo} alt="Logo ASAL" className="h-16 w-auto object-contain" />
          </div>

          {/* Core Navigation menu */}
          <nav id="navbar-links" className="flex flex-wrap items-center gap-1 bg-slate-900/90 border border-slate-800 p-1 rounded-full px-1.5">
            <button
              id="nav-home"
              onClick={() => setActiveTab("home")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                activeTab === "home"
                  ? "bg-amber-600 text-slate-950 shadow-md font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/45"
              }`}
            >
              Accueil
            </button>
            <button
              id="nav-tour360"
              onClick={() => setActiveTab("360")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                activeTab === "360"
                  ? "bg-amber-600 text-slate-950 shadow-md font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/45"
              }`}
            >
              Scène 360°
            </button>
            <button
              id="nav-gallery"
              onClick={() => setActiveTab("gallery")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                activeTab === "gallery"
                  ? "bg-amber-600 text-slate-950 shadow-md font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/45"
              }`}
            >
              Galerie
            </button>
            <button
              id="nav-pointcloud"
              onClick={() => setActiveTab("pointcloud")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                activeTab === "pointcloud"
                  ? "bg-amber-600 text-slate-950 shadow-md font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/45"
              }`}
            >
              Nuage de Points 
            </button>
          </nav>

        </div>
      </header>

      {/* RENDER ACTIVE TAB */}
      <main className="flex-1">

        {/* 1. HOME SCREEN */}
        {activeTab === "home" && (
          <>
            <div id="hero-tab-section" className="relative min-h-[calc(100vh-80px)] w-full flex flex-col justify-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img
                  src={accueilImage}
                  alt="Mosquée El Mechouar - Tlemcen"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/30 to-slate-950/40" />
              </div>
              <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center flex flex-col items-center justify-center">
                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-3"></div>
                <p className="text-amber-500 font-serif font-semibold text-lg tracking-widest uppercase mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">Tlemcen • Algérie</p>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.85)] font-serif leading-none whitespace-nowrap">
                  Mosquée <span className="text-amber-500 font-semibold">El Mechouar</span>
                </h1>
              </div>
            </div>

            {/* NOUS TROUVER & COORDONNÉES CTS */}
            <div id="contact-section" className="bg-slate-950/60 border-t border-slate-800/50">
              <div className="max-w-5xl mx-auto px-4 md:px-8 py-14">
                <Reveal>
                  <div className="text-center mb-10">
                    <span className="inline-block text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full uppercase tracking-widest mb-3">
                      Contact &amp; Localisation
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold font-serif text-white">
                      Nous Trouver
                    </h2>
                  </div>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Reveal delay={100}>
                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-7 space-y-5">
                      <h3 className="text-lg font-bold text-amber-400 font-serif">Centre des Techniques Spatiales</h3>
                      <div className="space-y-4 text-sm text-slate-300">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                          <span>Cité Satellitaire, BP 13 Arzew<br />31200 Oran — Algérie</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                          <span>+213 (0)41 47 20 00</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Printer className="w-4 h-4 text-amber-500 shrink-0" />
                          <span>+213 (0)41 47 20 10</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Globe className="w-4 h-4 text-amber-500 shrink-0" />
                          <a href="http://www.cts.asal.dz" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 flex items-center gap-1">
                            www.cts.asal.dz <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </Reveal>

                  <Reveal delay={200}>
                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-7">
                      <h3 className="text-lg font-bold text-amber-400 font-serif mb-4">Département Études et Gestion de Projets</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Le Centre des Techniques Spatiales (CTS) est un établissement public sous tutelle de l'Agence Spatiale Algérienne (ASAL), spécialisé dans les applications des technologies spatiales au service du développement national.
                      </p>
                      <div className="mt-5 pt-4 border-t border-slate-800">
                        <p className="text-xs text-slate-500">
                          Ce projet de visite virtuelle patrimoniale est réalisé dans le cadre des activités du Département Études et Gestion de Projets (DEGP).
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>

          </>
        )}

        {/* 2. GALLERY TAB (TOUR VR PORTFOLIO & DOCKING UPLOAD FILE CONTROLLER) */}
        {activeTab === "gallery" && (
          <div id="gallery-tab-section" className="max-w-7xl mx-auto px-4 md:px-8 py-10">
            
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-3xl md:text-5xl font-bold font-serif text-white">
                Galerie — Palais El-Mechouar
              </h2>
            </div>

            {/* CATEGORIES SWITCHER */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedCategory === cat
                        ? "bg-amber-600/90 text-slate-950 font-bold"
                        : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-855"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="text-xs text-slate-400">
                Total : <strong className="text-amber-400">{filteredGallery.length}</strong> visuels
              </div>
            </div>

            {/* PHOTO MASONRY/GRID CONTAINER */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGallery.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setLightboxImage(item)}
                  className="group bg-slate-950 rounded-xl overflow-hidden border border-slate-800 hover:border-amber-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-black/60 cursor-pointer relative"
                >
                  <div className="aspect-[4/3] w-full bg-slate-900 overflow-hidden relative">
                    <img
                      src={import.meta.env.BASE_URL + item.src.slice(1)}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Badge Category */}
                    <span className="absolute top-2.5 left-2.5 bg-slate-950/80 backdrop-blur border border-slate-800 text-[10px] text-amber-400 uppercase tracking-widest px-2.5 py-0.5 rounded-full font-bold">
                      {item.category}
                    </span>

                    {/* Delete locally uploaded button */}
                    {item.category === "Téléchargé" && (
                      <button
                        onClick={(e: MouseEvent<HTMLButtonElement>) => deleteGalleryItem(item.id, e)}
                        className="absolute top-2.5 right-2.5 p-1.5 bg-red-600/90 hover:bg-red-500 text-white rounded-full transition-colors opacity-0 group-hover:opacity-100 z-10"
                        title="Supprimer la photo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-slate-100 font-bold tracking-tight text-md group-hover:text-amber-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1.5 line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-slate-900 text-[10px] text-slate-500 font-mono">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-500" />
                        <span>{item.location}</span>
                      </div>
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* LIGHTBOX POPUP COMPONENT */}
            {lightboxImage && (
              <div
                className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
                onClick={() => setLightboxImage(null)}
              >
                <div
                  className="max-w-5xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative"
                  onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
                >
                  {/* Dismiss X button */}
                  <button
                    onClick={() => setLightboxImage(null)}
                    className="absolute top-4 right-4 p-2.5 bg-slate-950 border border-slate-800/80 text-slate-300 hover:text-white rounded-full hover:bg-slate-900 transition-colors z-[110]"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="flex flex-col lg:flex-row">
                    {/* Media container */}
                    <div className="lg:w-2/3 bg-black flex items-center justify-center relative min-h-[300px] lg:min-h-[550px]">
                      
                      <button
                        onClick={handlePrevLightbox}
                        className="absolute left-4 p-2 bg-slate-900/80 hover:bg-amber-600 text-amber-100 hover:text-slate-950 rounded-full border border-slate-800 transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      <img
                        src={import.meta.env.BASE_URL + lightboxImage.src.slice(1)}
                        alt={lightboxImage.title}
                        referrerPolicy="no-referrer"
                        className="max-h-[500px] md:max-h-[550px] w-auto max-w-full object-contain"
                      />

                      <button
                        onClick={handleNextLightbox}
                        className="absolute right-4 p-2 bg-slate-900/80 hover:bg-amber-600 text-amber-100 hover:text-slate-950 rounded-full border border-slate-800 transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Meta info column */}
                    <div className="lg:w-1/3 p-6 md:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-805">
                      <div>
                        <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider font-extrabold inline-block mb-3">
                          {lightboxImage.category}
                        </span>
                        <h3 className="text-2xl font-serif font-bold text-white leading-tight">
                          {lightboxImage.title}
                        </h3>
                        
                        <div className="mt-4 space-y-2.5 text-xs text-slate-300 leading-relaxed font-sans">
                          <p>{lightboxImage.description}</p>
                        </div>
                      </div>

                      <div className="mt-8 space-y-3.5 pt-6 border-t border-slate-800 font-mono text-[11px]">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Emplacement :</span>
                          <span className="font-bold text-slate-300">{lightboxImage.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Photographie :</span>
                          <span className="text-amber-500 font-medium">{lightboxImage.photographer}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* 3. 360° SCENE */}
        {activeTab === "360" && (
          <div id="tour360-tab-section" className="flex flex-col" style={{ height: "calc(100vh - 80px)" }}>

            {/* En-tête */}
            <div className="shrink-0 px-6 py-3 bg-slate-900 border-b border-slate-800">
              <span className="inline-flex items-center font-mono text-[10px] text-cyan-400 bg-cyan-950/60 border border-cyan-500/20 px-2.5 py-0.5 rounded-full uppercase tracking-widest">
                Visualisation Immersive
              </span>
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-white mt-1.5">
                Scène Sphérique Virtuelle 360°
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mt-1.5 max-w-2xl">
                Naviguez directement à l'intérieur du monument comme si vous y étiez. Déplacez votre curseur ou faites glisser votre doigt pour explorer à 360 degrés. Cliquez sur les hotspots pour afficher des informations architecturales.
              </p>
            </div>

            {/* Iframe scène */}
            <div className="flex-1 overflow-hidden">
              <iframe
                src={import.meta.env.BASE_URL + 'visite-virtuel/index.htm'}
                title="Visite Virtuelle 360° — Palais El-Mechouar Tlemcen"
                className="w-full h-full border-0"
                allow="fullscreen; gyroscope; accelerometer"
                allowFullScreen
              />
            </div>

          </div>
        )}

        {/* 4. POINT CLOUD TAB — VIDEOS ONLY */}
        {activeTab === "pointcloud" && (
          <div id="pointcloud-tab-section" className="max-w-5xl mx-auto px-4 md:px-8 py-10">

            <video
              key={selectedVideo}
              src={selectedVideo}
              controls
              className="w-full rounded-xl border border-slate-800 bg-black mb-4"
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {scanVideos.map((v) => (
                <button
                  key={v.url}
                  onClick={() => setSelectedVideo(v.url)}
                  className={`py-2 px-3 rounded border text-center transition-all truncate ${
                    selectedVideo === v.url
                      ? "bg-amber-600 text-slate-950 border-amber-400 font-bold"
                      : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800"
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/15 px-6 lg:px-8 py-8 mt-4">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-white/60">
          <div className="flex items-center gap-3">
            <img src={ctsLogo} alt="CTS" className="h-8 w-auto object-contain" />
            <img src={asalLogo} alt="ASAL" className="h-8 w-auto object-contain" />
            <p>© {new Date().getFullYear()} Centre des Techniques Spatiales — Agence Spatiale Algérienne.</p>
          </div>
          <p>Département Etudes et Gestion de Projets</p>
        </div>
      </footer>

    </div>
  );
}
