import React, { useState, useEffect, useRef } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { MapPin, Navigation, Locate, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with Vite
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

const locations = [
  { id: 1, name: 'Masjidil Haram', description: 'Lokasi Kabah dan Tawaf', coords: [21.4225, 39.8262] as [number, number] },
  { id: 2, name: 'Safa & Marwah', description: 'Lokasi Sai', coords: [21.4227, 39.8285] as [number, number] },
  { id: 3, name: 'Arafah', description: 'Lokasi Wukuf', coords: [21.3549, 39.9839] as [number, number] },
  { id: 4, name: 'Muzdalifah', description: 'Lokasi Mabit', coords: [21.3900, 39.9200] as [number, number] },
  { id: 5, name: 'Mina', description: 'Lokasi Melontar Jumrah', coords: [21.4200, 39.8900] as [number, number] },
];

export default function Peta() {
  const [activeLocation, setActiveLocation] = useState(locations[0]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const userMarkerRef = useRef<L.Marker | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: activeLocation.coords,
      zoom: 15,
      zoomControl: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add markers
    locations.forEach((loc) => {
      const marker = L.marker(loc.coords)
        .addTo(map)
        .bindPopup(`<b>${loc.name}</b><br>${loc.description}`);

      marker.on('click', () => {
        setActiveLocation(loc);
      });

      markersRef.current.push(marker);
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = [];
    };
  }, []);

  // Update map view when location changes
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(activeLocation.coords, 16, { animate: true });
    }
  }, [activeLocation]);

  const handleLocationSelect = (location: typeof locations[0]) => {
    setActiveLocation(location);
  };

  const handleResetView = () => {
    if (mapRef.current) {
      mapRef.current.setView([21.4225, 39.8262], 13, { animate: true });
    }
  };

  // Request user location
  const handleRequestLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation tidak didukung di browser ini');
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: [number, number] = [position.coords.latitude, position.coords.longitude];
        setUserLocation(coords);
        setIsLocating(false);

        // Add or update user marker
        if (mapRef.current) {
          if (userMarkerRef.current) {
            userMarkerRef.current.setLatLng(coords);
          } else {
            const userIcon = L.divIcon({
              className: 'user-location-marker',
              html: '<div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>',
              iconSize: [16, 16],
              iconAnchor: [8, 8],
            });
            userMarkerRef.current = L.marker(coords, { icon: userIcon })
              .addTo(mapRef.current)
              .bindPopup('<b>Lokasi Anda</b>');
          }
          mapRef.current.setView(coords, 16, { animate: true });
        }
      },
      (error) => {
        setIsLocating(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Izin lokasi ditolak. Aktifkan izin lokasi di pengaturan browser.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Lokasi tidak tersedia.');
            break;
          case error.TIMEOUT:
            setLocationError('Permintaan lokasi timeout.');
            break;
          default:
            setLocationError('Gagal mendapatkan lokasi.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <PageContainer>
      <header className="safe-top px-6 pt-6 pb-2">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Peta Lokasi Haji</h1>
              <p className="text-muted-foreground mt-1 text-sm">Panduan navigasi tempat-tempat suci</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Navigation className="w-5 h-5" />
            </div>
          </div>
        </motion.div>
      </header>

      <main className="px-6 py-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="aspect-[4/3] sm:aspect-video bg-muted rounded-3xl overflow-hidden border border-border shadow-lg relative"
        >
          <div
            ref={mapContainerRef}
            className="w-full h-full z-10"
            style={{ minHeight: '300px' }}
          />

          <button
            onClick={handleResetView}
            className="absolute bottom-4 right-4 z-[1000] bg-white dark:bg-slate-800 p-2 rounded-full shadow-md border border-border text-primary hover:bg-gray-50 transition-colors"
          >
            <Navigation className="w-5 h-5" />
          </button>

          <button
            onClick={handleRequestLocation}
            disabled={isLocating}
            className="absolute bottom-4 right-16 z-[1000] bg-white dark:bg-slate-800 p-2 rounded-full shadow-md border border-border text-blue-500 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {isLocating ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Locate className="w-5 h-5" />
            )}
          </button>
        </motion.div>

        {/* Location Error Message */}
        {locationError && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-2 rounded-xl text-sm">
            {locationError}
          </div>
        )}

        {/* Location List */}
        <section className="pb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Lokasi Penting
            </h2>
            <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
              {locations.length} Lokasi
            </span>
          </div>

          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {locations.map((location, index) => (
                <motion.button
                  key={location.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleLocationSelect(location)}
                  className={`w-full text-left bg-card rounded-2xl p-4 border transition-all duration-300 flex items-center gap-4 ${activeLocation.id === location.id
                    ? 'border-primary ring-1 ring-primary/20 shadow-md ring-offset-0'
                    : 'border-border hover:border-primary/50'
                    }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${activeLocation.id === location.id ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                    }`}>
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className={`font-bold transition-colors ${activeLocation.id === location.id ? 'text-primary' : 'text-foreground'
                      }`}>
                      {location.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                      {location.description}
                    </p>
                  </div>
                  {activeLocation.id === location.id && (
                    <motion.div
                      layoutId="active-indicator"
                      className="w-2 h-2 rounded-full bg-primary"
                    />
                  )}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <style>{`
        .leaflet-container {
          background-color: #f8fafc;
          z-index: 10 !important;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 12px;
        }
      `}</style>
    </PageContainer>
  );
}
