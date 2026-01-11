import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { useApp } from '@/contexts/AppContext';
import { Settings, Download, RefreshCw, Info, ChevronRight, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Lainnya() {
  const { mode, audioLanguage, resetApp } = useApp();
  const navigate = useNavigate();

  const modeLabels: Record<string, string> = {
    lansia: 'Mode Lansia',
    pendamping: 'Mode Pendamping',
    umum: 'Mode Umum',
  };

  const languageLabels: Record<string, string> = {
    indonesia: 'Bahasa Indonesia',
    sasak: 'Bahasa Sasak',
    samawa: 'Bahasa Samawa',
    mbojo: 'Bahasa Mbojo',
  };

  const handleReset = () => {
    if (confirm('Apakah Anda yakin ingin mengatur ulang aplikasi? Semua progress akan hilang.')) {
      resetApp();
      navigate('/onboarding', { replace: true });
    }
  };

  const menuItems = [
    {
      icon: Settings,
      title: 'Pengaturan Mode',
      description: mode ? modeLabels[mode] : '-',
      action: () => {},
    },
    {
      icon: Volume2,
      title: 'Bahasa Audio',
      description: audioLanguage ? languageLabels[audioLanguage] : '-',
      action: () => {},
    },
    {
      icon: Download,
      title: 'Unduh Audio Offline',
      description: 'Simpan audio untuk digunakan tanpa internet',
      action: () => {},
    },
    {
      icon: Info,
      title: 'Tentang Aplikasi',
      description: 'Versi 1.0.0',
      action: () => {},
    },
    {
      icon: RefreshCw,
      title: 'Atur Ulang Aplikasi',
      description: 'Kembali ke pengaturan awal',
      action: handleReset,
      destructive: true,
    },
  ];

  return (
    <PageContainer>
      <header className="safe-top px-6 pt-6 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-foreground">
            Lainnya
          </h1>
          <p className="text-muted-foreground mt-1">
            Pengaturan dan informasi
          </p>
        </motion.div>
      </header>

      <main className="px-6 py-4">
        <div className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={item.action}
                className={`w-full p-4 rounded-xl border text-left flex items-center gap-4 transition-colors ${
                  item.destructive
                    ? 'bg-destructive/5 border-destructive/20 hover:bg-destructive/10'
                    : 'bg-card border-border hover:bg-muted/50'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  item.destructive
                    ? 'bg-destructive/10 text-destructive'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-medium ${
                    item.destructive ? 'text-destructive' : 'text-foreground'
                  }`}>
                    {item.title}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {item.description}
                  </p>
                </div>
                <ChevronRight className={`w-5 h-5 ${
                  item.destructive ? 'text-destructive/50' : 'text-muted-foreground'
                }`} />
              </motion.button>
            );
          })}
        </div>

        {/* App Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Panduan Manasik Haji
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Audio dalam bahasa daerah Sasambo
          </p>
        </motion.div>
      </main>
    </PageContainer>
  );
}
