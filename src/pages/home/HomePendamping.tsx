import React from 'react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { Play, List, Users, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

export function HomePendamping() {
  const { currentStep, totalSteps, audioLanguage } = useApp();
  const navigate = useNavigate();

  const languageLabels: Record<string, string> = {
    indonesia: 'Bahasa Indonesia',
    sasak: 'Bahasa Sasak',
    samawa: 'Bahasa Samawa',
    mbojo: 'Bahasa Mbojo',
  };

  return (
    <PageContainer>
      {/* Header */}
      <header className="safe-top px-6 pt-6 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Mode Pendamping</p>
              <h1 className="text-2xl font-bold text-foreground">
                Panduan Manasik
              </h1>
            </div>
            <button
              onClick={() => navigate('/lainnya')}
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
              aria-label="Pengaturan"
            >
              <Settings className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </motion.div>
      </header>

      <main className="px-6 py-4 space-y-6">
        {/* Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-5 border border-border shadow-soft"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Progress Jamaah</p>
              <p className="text-xl font-bold text-foreground">
                Tahap {currentStep} dari {totalSteps}
              </p>
              <p className="text-sm text-muted-foreground">
                Audio: {audioLanguage ? languageLabels[audioLanguage] : '-'}
              </p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="h-full bg-primary rounded-full"
            />
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-4"
        >
          <Button
            variant="default"
            size="lg"
            onClick={() => navigate('/manasik/tahapan')}
            className="flex-col h-auto py-6 gap-2"
          >
            <Play className="w-6 h-6" />
            <span>Lanjutkan Tahapan</span>
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/manasik')}
            className="flex-col h-auto py-6 gap-2"
          >
            <List className="w-6 h-6" />
            <span>Pilih Tahapan</span>
          </Button>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <h2 className="text-lg font-semibold text-foreground">Panduan Pendamping</h2>
          
          <div className="bg-gold-light rounded-xl p-4 border border-accent/20">
            <p className="text-sm text-gold-foreground">
              Sebagai pendamping, Anda dapat membuka tahapan mana pun untuk membimbing jamaah. 
              Pastikan jamaah memahami setiap rukun sebelum melanjutkan.
            </p>
          </div>
        </motion.div>
      </main>
    </PageContainer>
  );
}
