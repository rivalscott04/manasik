import React from 'react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { Play, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

export function HomeLansia() {
  const { currentStep, totalSteps } = useApp();
  const navigate = useNavigate();
  const isStarting = currentStep === 1;

  const handleStartManasik = () => {
    navigate('/manasik/tahapan');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="safe-top px-6 pt-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-elderly-2xl font-bold text-foreground">
            Panduan Manasik Haji
          </h1>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-sm text-center"
        >
          {/* Decorative Kaaba Icon */}
          <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-primary/10 flex items-center justify-center">
            <div className="w-12 h-12 bg-primary rounded-lg" />
          </div>

          {/* Progress */}
          <div className="bg-card rounded-2xl p-6 border border-border shadow-soft mb-8">
            <p className="text-elderly-lg text-muted-foreground mb-2">
              Progress Anda
            </p>
            <p className="text-elderly-2xl font-bold text-foreground">
              Tahap {currentStep} dari {totalSteps}
            </p>
            
            {/* Progress Bar */}
            <div className="mt-4 h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                className="h-full bg-primary rounded-full"
              />
            </div>
          </div>

          {/* Main Action Button */}
          <Button
            variant="elderly"
            size="xl"
            onClick={handleStartManasik}
            className="w-full gap-3"
            aria-label={isStarting ? 'Mulai panduan manasik' : 'Lanjutkan panduan manasik'}
          >
            {isStarting ? (
              <>
                <Play className="w-6 h-6" />
                Mulai Manasik
              </>
            ) : (
              <>
                <RotateCcw className="w-6 h-6" />
                Lanjutkan Manasik
              </>
            )}
          </Button>
        </motion.div>
      </main>

      {/* Footer with gold divider */}
      <footer className="px-6 py-6 safe-bottom">
        <div className="divider-gold mb-4" />
        <p className="text-center text-sm text-muted-foreground">
          Dengarkan panduan audio dengan seksama
        </p>
      </footer>
    </div>
  );
}
