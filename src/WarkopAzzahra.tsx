import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { 
  UtensilsCrossed, 
  Coffee, 
  Briefcase, 
  Tag, 
  MessageCircle, 
  ChevronRight, 
  Clock, 
  MapPin, 
  Phone,
  ArrowUpRight,
  Star,
  Info,
  CheckCircle2
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/10 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div 
            whileHover={{ rotate: 180 }}
            className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center"
          >
            <UtensilsCrossed className="text-yellow-400 w-6 h-6" />
          </motion.div>
          <span className="text-2xl font-black tracking-tighter">
            <span className="text-white">AZZAHRA</span> <span className="text-red-600">WARKOP</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-white/70">
          {["Home", "Menu", "Promo", "Loker"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-red-500 transition-colors">
              {item}
            </a>
          ))}
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact" 
            className="bg-yellow-500 text-black px-6 py-2 rounded-full font-black"
          >
            Hubungi Kami
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-neutral-950">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-600/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="inline-block mb-6 px-4 py-1.5 bg-red-600/10 border border-red-600/20 rounded-full"
        >
          <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.4em]">Warung Kopi & Sop Saudara</span>
        </motion.div>
        
        <h1 className="text-7xl md:text-9xl font-black text-white leading-none mb-8 tracking-tighter">
          CITARASA <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 bg-[length:200%_auto] animate-gradient italic font-serif">Azzahra Celebes</span>
        </h1>

        <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed italic">
          "Tempat ternyaman untuk menikmati Sop Saudara legendaris dan kopi pilihan di tengah kota Makassar."
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(220, 38, 38, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm"
          >
            Pesan Sekarang
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.1)" }}
            className="px-12 py-5 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-sm backdrop-blur-md"
          >
            Lihat Menu
          </motion.button>
        </div>
      </motion.div>

      {/* Floating 3D Elements (Visual Decoration) */}
      <FloatingElements />
    </section>
  );
};

const FloatingElements = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -40, 0],
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute"
          style={{
            left: `${10 + i * 20}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
        >
          {i % 2 === 0 ? (
            <Coffee className="w-16 h-16 text-yellow-500/20" />
          ) : (
            <UtensilsCrossed className="w-20 h-20 text-red-600/20" />
          )}
        </motion.div>
      ))}
    </div>
  );
};

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState("makanan");

  const menuItems = {
    makanan: [
      {
        name: "Sop Saudara Spesial",
        desc: "Sajian khas dengan daging sapi empuk, paru goreng, perkedel, dan soun dalam kuah rempah kental.",
        price: "Rp 35.000",
        image: "🍜",
        popular: true
      },
      {
        name: "Konro Bakar Madu",
        desc: "Iga sapi bakar dengan olesan madu dan bumbu kacang rahasia Azzahra.",
        price: "Rp 55.000",
        image: "🍖"
      },
      {
        name: "Nasi Campur Makassar",
        desc: "Nasi dengan berbagai lauk pauk khas Makassar: daging topat, abon, dan sambal goreng.",
        price: "Rp 30.000",
        image: "🍱"
      }
    ],
    minuman: [
      {
        name: "Kopi Susu Gula Aren",
        desc: "Kopi robusta dengan susu segar dan kemanisan gula aren asli.",
        price: "Rp 18.000",
        image: "☕",
        popular: true
      },
      {
        name: "Es Teh Manis Azzahra",
        desc: "Seduhan teh pilihan dengan aroma jasmine yang menenangkan.",
        price: "Rp 8.000",
        image: "🍹"
      },
      {
        name: "Jus Alpukat Kerok",
        desc: "Jus alpukat mentega dengan topping coklat dan potongan buah asli.",
        price: "Rp 25.000",
        image: "🥑"
      }
    ]
  };

  return (
    <section id="menu" className="py-32 bg-neutral-900 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <span className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Daftar Menu Kami</span>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
              PILIHAN <span className="text-yellow-500 italic font-serif">TERBAIK</span>
            </h2>
          </div>
          
          <div className="flex gap-4 bg-black/40 p-2 rounded-2xl border border-white/5 backdrop-blur-xl">
            {["makanan", "minuman"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all ${
                  activeCategory === cat ? "bg-red-600 text-white shadow-xl shadow-red-600/20" : "text-white/40 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {menuItems[activeCategory as keyof typeof menuItems].map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-black/40 border border-white/5 rounded-[2.5rem] p-8 overflow-hidden"
              >
                {item.popular && (
                  <div className="absolute top-6 right-6 bg-yellow-500 text-black px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" /> Best Seller
                  </div>
                )}
                
                <div className="text-6xl mb-8 group-hover:scale-110 transition-transform duration-500">{item.image}</div>
                
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-500 transition-colors">
                  {item.name}
                </h3>
                
                <p className="text-white/40 text-sm leading-relaxed mb-8">
                  {item.desc}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-yellow-500">{item.price}</span>
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const PromoSection = () => {
  return (
    <section id="promo" className="py-32 relative overflow-hidden bg-red-600">
      {/* Decorative Circles */}
      <div className="absolute -top-24 -left-24 w-96 h-96 border-[40px] border-white/10 rounded-full" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 border-[40px] border-yellow-400/20 rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-400 text-black rounded-full text-[10px] font-black uppercase tracking-widest mb-8">
              <Tag className="w-4 h-4" /> Limited Time Offer
            </div>
            <h2 className="text-6xl md:text-8xl font-black text-white leading-none mb-8 tracking-tighter">
              PAKET <br /> <span className="text-yellow-400">SAUDARA</span> <br /> KENYANG
            </h2>
            <p className="text-white/80 text-xl mb-12 max-w-md italic">
              Nikmati perpaduan Sop Saudara Spesial + Nasi + Es Teh hanya dengan harga spesial bulan ini!
            </p>
            <div className="flex items-end gap-4 mb-12">
              <span className="text-7xl font-black text-white tracking-tighter underline decoration-yellow-400 decoration-8 underline-offset-8">Rp 40k</span>
              <span className="text-2xl text-white/50 line-through font-bold mb-2">Rp 55.000</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-2xl"
            >
              Klaim Promo Sekarang
            </motion.button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square bg-yellow-500 rounded-[4rem] p-4 rotate-3 shadow-2xl">
              <div className="w-full h-full bg-black rounded-[3rem] flex items-center justify-center overflow-hidden">
                <span className="text-[12rem]">🥣</span>
              </div>
            </div>
            {/* Floating Badge */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full flex items-center justify-center border-8 border-yellow-500 shadow-2xl"
            >
              <div className="text-center">
                <p className="text-black font-black text-xs leading-none">SAVE</p>
                <p className="text-red-600 font-black text-4xl leading-none">25%</p>
                <p className="text-black font-black text-[8px] uppercase tracking-tighter">OFF PRICE</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const LokerSection = () => {
  const jobs = [
    {
      title: "Barista Professional",
      type: "Full-time",
      requirements: ["Berpengalaman min. 1 thn", "Menguasai Latte Art", "Mampu bekerja tim"],
      icon: <Coffee className="w-6 h-6" />
    },
    {
      title: "Waitress / Server",
      type: "Part-time / Full-time",
      requirements: ["Wanita, Max 24 thn", "Berpenampilan rapi", "Ramah & Komunikatif"],
      icon: <Star className="w-6 h-6" />
    }
  ];

  return (
    <section id="loker" className="py-32 bg-black px-6 overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <span className="text-yellow-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Kami Membutuhkan Anda</span>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
            JOIN THE <span className="text-red-600">CREW</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {jobs.map((job, idx) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group p-10 bg-neutral-900 border border-white/5 rounded-[3rem] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 blur-3xl group-hover:bg-red-600/20 transition-all" />
              
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-yellow-500">
                  {job.icon}
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-1">{job.title}</h3>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/30">{job.type}</span>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                {job.requirements.map((req) => (
                  <div key={req} className="flex items-center gap-3 text-white/60">
                    <CheckCircle2 className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-medium">{req}</span>
                  </div>
                ))}
              </div>

              <button className="w-full py-4 bg-white/5 hover:bg-red-600 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-3 group">
                Apply via WhatsApp <ArrowUpRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 p-8 bg-yellow-500/10 border border-yellow-500/20 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <Info className="w-8 h-8 text-yellow-500" />
            <p className="text-white/60 text-sm italic">
              "Kami selalu mencari talenta berbakat yang berdedikasi tinggi untuk melestarikan kuliner nusantara."
            </p>
          </div>
          <div className="text-white font-black text-xl">#AzzahraCareer</div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-neutral-950 pt-32 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center">
                <UtensilsCrossed className="text-yellow-400 w-7 h-7" />
              </div>
              <span className="text-3xl font-black tracking-tighter text-white">AZZAHRA WARKOP</span>
            </div>
            <p className="text-white/40 text-lg leading-relaxed max-w-md italic mb-8">
              Warung Kopi dan Sop Saudara dengan resep autentik yang terus dijaga kualitasnya sejak generasi pertama.
            </p>
            <div className="flex gap-4">
              {/* Social placeholders */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-12 h-12 bg-white/5 rounded-full hover:bg-red-600 transition-colors flex items-center justify-center text-white cursor-pointer" />
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-8">Navigation</h4>
              <ul className="space-y-4 text-white/40 text-sm font-medium">
                <li><a href="#" className="hover:text-red-500">Home</a></li>
                <li><a href="#menu" className="hover:text-red-500">Menu</a></li>
                <li><a href="#promo" className="hover:text-red-500">Promo</a></li>
                <li><a href="#loker" className="hover:text-red-500">Loker</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-8">Quick Links</h4>
              <ul className="space-y-4 text-white/40 text-sm font-medium">
                <li><a href="#" className="hover:text-red-500">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-red-500">Terms of Service</a></li>
                <li><a href="#" className="hover:text-red-500">Contact Support</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-8">Location</h4>
              <div className="space-y-4 text-white/40 text-sm font-medium italic">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-500 shrink-0" />
                  <span>Jl. Tupai No. 38, Makassar, Sulawesi Selatan</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-yellow-500 shrink-0" />
                  <span>Setiap Hari: 08.00 - 22.00 WITA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-[10px] font-black uppercase tracking-widest">
            &copy; 2024 Azzahra Celebes Project. All rights reserved.
          </p>
          <p className="text-white/20 text-[10px] font-black uppercase tracking-widest">
            Designed by Antigravity AI
          </p>
        </div>
      </div>
    </footer>
  );
};

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/6287841780609?text=Halo%20Warkop%20Azzahra,%20saya%20ingin%20memesan/bertanya."
      target="_blank"
      initial={{ scale: 0, rotate: -45 }}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-10 right-10 z-[200] bg-green-500 text-white p-5 rounded-3xl shadow-2xl flex items-center gap-4 group"
    >
      <div className="hidden group-hover:block whitespace-nowrap font-black uppercase tracking-widest text-xs">
        Chat with us
      </div>
      <MessageCircle className="w-8 h-8" />
    </motion.a>
  );
};

export default function WarkopAzzahra() {
  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="bg-neutral-950 min-h-screen text-white font-sans selection:bg-red-600 selection:text-white overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-red-600 z-[1000] origin-left"
        style={{ scaleX: useScroll().scrollYProgress }}
      />
      
      <Navbar />
      <Hero />
      <MenuSection />
      <PromoSection />
      <LokerSection />
      <Footer />
      <WhatsAppButton />
      
      {/* Global styles for animations */}
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 5s linear infinite;
        }
      `}</style>
    </div>
  );
}
