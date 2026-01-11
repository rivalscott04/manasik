import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface WelcomeScreenProps {
  onNext: () => void;
}

export function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Show button after 2 seconds for accessibility
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2000);

    // Auto-advance after 4 seconds if no interaction
    const autoAdvance = setTimeout(() => {
      onNext();
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearTimeout(autoAdvance);
    };
  }, [onNext]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-islamic p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-lg"
      >
        {/* Arabic Greeting */}
        <h1 
          className="font-arabic text-4xl md:text-5xl lg:text-6xl text-primary-foreground leading-relaxed mb-8"
          dir="rtl"
          lang="ar"
          aria-label="Assalamualaikum Warahmatullahi Wabarakatuh"
        >
          السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ
        </h1>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 bg-primary-foreground/30" />
          <div className="w-2 h-2 rounded-full bg-accent" />
          <div className="h-px w-16 bg-primary-foreground/30" />
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-lg md:text-xl text-primary-foreground/90"
        >
          Selamat datang di Panduan Manasik Haji
        </motion.p>

        {/* Continue button - appears after delay for accessibility */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showButton ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="mt-12"
        >
          <Button
            variant="gold"
            size="xl"
            onClick={onNext}
            className="w-full max-w-xs"
            aria-label="Lanjutkan ke langkah berikutnya"
          >
            Lanjut
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
