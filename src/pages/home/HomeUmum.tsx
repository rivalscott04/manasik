import React from 'react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { BookOpen, Map, HandHelping, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const menuCards = [
  {
    title: 'Panduan Manasik',
    description: '10 tahapan ibadah haji',
    icon: BookOpen,
    path: '/manasik',
    color: 'bg-primary/10 text-primary',
  },
  {
    title: 'Peta Lokasi',
    description: 'Peta interaktif Makkah',
    icon: Map,
    path: '/peta',
    color: 'bg-info/10 text-info',
  },
  {
    title: 'Kumpulan Doa',
    description: 'Doa dan dzikir haji',
    icon: HandHelping,
    path: '/doa',
    color: 'bg-accent/20 text-accent-foreground',
  },
];

export function HomeUmum() {
  const { currentStep, totalSteps } = useApp();
  const navigate = useNavigate();

  return (
    <PageContainer>
      {/* Header */}
      <header className="safe-top bg-gradient-islamic px-6 pt-8 pb-12 rounded-b-3xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-primary-foreground"
        >
          <p className="text-sm opacity-80 mb-1">Panduan Lengkap</p>
          <h1 className="text-2xl font-bold">Manasik Haji</h1>
        </motion.div>

        {/* Progress Card - Floating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-5 shadow-elevated mt-6 -mb-8 relative z-10"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-muted-foreground">Progress Belajar</p>
              <p className="text-lg font-bold text-foreground">
                {currentStep} dari {totalSteps} Tahapan
              </p>
            </div>
            <Button
              size="sm"
              onClick={() => navigate('/manasik/tahapan')}
              className="gap-1"
            >
              Lanjutkan
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="h-full bg-primary rounded-full"
            />
          </div>
        </motion.div>
      </header>

      <main className="px-6 pt-12 pb-6 space-y-6">
        {/* Menu Cards */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">Menu Utama</h2>
          <div className="space-y-3">
            {menuCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.button
                  key={card.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  onClick={() => navigate(card.path)}
                  className="w-full bg-card rounded-xl p-4 border border-border shadow-soft flex items-center gap-4 text-left hover:shadow-medium transition-shadow"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{card.title}</p>
                    <p className="text-sm text-muted-foreground">{card.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* Info Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="bg-gold-light rounded-xl p-4 border border-accent/20">
            <h3 className="font-semibold text-gold-foreground mb-2">
              Tentang Aplikasi
            </h3>
            <p className="text-sm text-gold-foreground/80">
              Aplikasi ini menyediakan panduan lengkap manasik haji dengan audio dalam bahasa daerah Sasambo: 
              Sasak, Samawa, dan Mbojo.
            </p>
          </div>
        </motion.section>
      </main>
    </PageContainer>
  );
}
