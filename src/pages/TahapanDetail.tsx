import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { ArrowLeft, Play, Pause, SkipForward, Check, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface TahapanInfo {
  title: string;
  description: string;
  steps: string[];
}

const tahapanData: Record<number, TahapanInfo> = {
  1: {
    title: 'Ihram',
    description: 'Niat dan berpakaian ihram adalah langkah pertama dalam ibadah haji.',
    steps: [
      'Mandi sunnah dan memakai wangi-wangian',
      'Memakai pakaian ihram (2 lembar kain putih tanpa jahitan untuk laki-laki)',
      'Shalat sunnah ihram 2 rakaat',
      'Niat ihram dari miqat dengan mengucapkan Talbiyah',
      'Membaca Talbiyah: Labbaikallahumma labbaik...',
    ],
  },
  2: {
    title: 'Tawaf Qudum',
    description: 'Tawaf qudum adalah tawaf kedatangan sebagai penghormatan kepada Kabah.',
    steps: [
      'Memasuki Masjidil Haram dengan kaki kanan',
      'Membaca doa masuk masjid',
      'Memulai tawaf dari Hajar Aswad',
      'Mengelilingi Kabah 7 kali dengan Kabah di sebelah kiri',
      'Shalat 2 rakaat di belakang Maqam Ibrahim',
    ],
  },
  3: {
    title: 'Sai',
    description: 'Sai adalah berjalan antara bukit Safa dan Marwah sebanyak 7 kali.',
    steps: [
      'Memulai dari bukit Safa',
      'Berdoa menghadap Kabah di Safa',
      'Berjalan menuju Marwah',
      'Berlari kecil di antara dua tanda hijau (khusus laki-laki)',
      'Menyelesaikan 7 kali perjalanan, berakhir di Marwah',
    ],
  },
  4: {
    title: 'Wukuf di Arafah',
    description: 'Wukuf adalah rukun haji yang paling utama, dilakukan pada tanggal 9 Dzulhijjah.',
    steps: [
      'Berangkat ke Arafah setelah terbit matahari tanggal 9 Dzulhijjah',
      'Berdiam di Arafah hingga terbenam matahari',
      'Memperbanyak doa, dzikir, dan istighfar',
      'Mendengarkan khutbah wukuf',
      'Berangkat ke Muzdalifah setelah maghrib',
    ],
  },
  5: {
    title: 'Mabit di Muzdalifah',
    description: 'Mabit adalah bermalam di Muzdalifah dan mengumpulkan kerikil untuk melontar jumrah.',
    steps: [
      'Tiba di Muzdalifah setelah wukuf',
      'Shalat Maghrib dan Isya dijamak',
      'Bermalam hingga lewat tengah malam',
      'Mengumpulkan kerikil untuk melontar jumrah',
      'Berangkat ke Mina sebelum fajar',
    ],
  },
  6: {
    title: 'Melontar Jumrah',
    description: 'Melontar Jumrah Aqabah adalah kewajiban haji pada hari Nahar.',
    steps: [
      'Melontar Jumrah Aqabah dengan 7 kerikil',
      'Setiap lontaran disertai takbir',
      'Melontar setelah terbit matahari pada hari Nahar',
      'Pada hari Tasyrik, melontar ketiga jumrah',
      'Urutan: Ula, Wustha, Aqabah',
    ],
  },
  7: {
    title: 'Tahallul',
    description: 'Tahallul adalah mencukur atau memotong rambut setelah melontar.',
    steps: [
      'Mencukur habis rambut (untuk laki-laki)',
      'Memotong rambut minimal 3 helai (untuk perempuan)',
      'Tahallul awal: bebas dari larangan ihram kecuali hubungan suami istri',
      'Tahallul tsani: setelah tawaf ifadhah dan sai',
      'Bebas dari seluruh larangan ihram',
    ],
  },
  8: {
    title: 'Tawaf Ifadhah',
    description: 'Tawaf Ifadhah adalah rukun haji yang dilakukan setelah wukuf.',
    steps: [
      'Kembali ke Makkah setelah tahallul',
      'Melakukan tawaf 7 putaran',
      'Shalat 2 rakaat di Maqam Ibrahim',
      'Dilanjutkan dengan sai',
      'Tawaf ini menentukan sahnya haji',
    ],
  },
  9: {
    title: 'Mabit di Mina',
    description: 'Mabit di Mina dilakukan pada hari-hari Tasyrik.',
    steps: [
      'Bermalam di Mina selama hari Tasyrik',
      'Minimal setengah malam di Mina',
      'Melontar jumrah setiap hari Tasyrik',
      'Memperbanyak dzikir dan ibadah',
      'Boleh nafar awal pada tanggal 12',
    ],
  },
  10: {
    title: 'Tawaf Wada',
    description: 'Tawaf Wada adalah tawaf perpisahan sebelum meninggalkan Makkah.',
    steps: [
      'Dilakukan sebelum meninggalkan Makkah',
      'Tawaf 7 putaran seperti biasa',
      'Shalat 2 rakaat di Maqam Ibrahim',
      'Berdoa di Multazam',
      'Keluar dari Masjidil Haram dengan kaki kiri',
    ],
  },
};

export default function TahapanDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { mode, currentStep, setCurrentStep, totalSteps, audioLanguage } = useApp();
  
  const stepNumber = parseInt(id || '1', 10);
  const tahapan = tahapanData[stepNumber];
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayedAudio, setHasPlayedAudio] = useState(false);

  const isElderly = mode === 'lansia';
  const isLastStep = stepNumber === totalSteps;

  // Auto-play audio for elderly mode
  useEffect(() => {
    if (isElderly && !hasPlayedAudio) {
      // Simulate auto-play
      setIsPlaying(true);
      const timer = setTimeout(() => {
        setIsPlaying(false);
        setHasPlayedAudio(true);
      }, 3000); // Simulated audio duration
      return () => clearTimeout(timer);
    }
  }, [isElderly, hasPlayedAudio]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && !hasPlayedAudio) {
      setTimeout(() => {
        setHasPlayedAudio(true);
        setIsPlaying(false);
      }, 3000);
    }
  };

  const handleComplete = () => {
    if (stepNumber >= currentStep) {
      setCurrentStep(stepNumber + 1);
    }
    
    if (isLastStep) {
      navigate('/');
    } else {
      navigate(`/manasik/tahapan/${stepNumber + 1}`);
    }
  };

  const handleBack = () => {
    if (isElderly) {
      navigate('/');
    } else {
      navigate('/manasik');
    }
  };

  if (!tahapan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Tahapan tidak ditemukan</p>
      </div>
    );
  }

  const languageLabels: Record<string, string> = {
    indonesia: 'Indonesia',
    sasak: 'Sasak',
    samawa: 'Samawa',
    mbojo: 'Mbojo',
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="safe-top px-4 pt-4 pb-2">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
            aria-label="Kembali"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">
              Tahap {stepNumber} dari {totalSteps}
            </p>
            <h1 className={`font-bold ${isElderly ? 'text-elderly-xl' : 'text-xl'}`}>
              {tahapan.title}
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-4 overflow-auto pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Description */}
          <p className={`text-muted-foreground ${isElderly ? 'text-elderly-base' : ''}`}>
            {tahapan.description}
          </p>

          {/* Steps */}
          <div className="space-y-3">
            <h2 className={`font-semibold ${isElderly ? 'text-elderly-lg' : 'text-lg'}`}>
              Langkah-langkah:
            </h2>
            <ol className="space-y-3">
              {tahapan.steps.map((step, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-3"
                >
                  <span className={`w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-semibold ${
                    isElderly ? 'text-base' : 'text-sm'
                  }`}>
                    {index + 1}
                  </span>
                  <p className={`text-foreground pt-0.5 ${isElderly ? 'text-elderly-base' : ''}`}>
                    {step}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>
        </motion.div>
      </main>

      {/* Fixed Audio Player & Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-bottom">
        {/* Audio Player */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center gap-4">
            <button
              onClick={handlePlayPause}
              className={`w-14 h-14 rounded-full flex items-center justify-center ${
                isPlaying ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
              }`}
              aria-label={isPlaying ? 'Jeda audio' : 'Putar audio'}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-1" />
              )}
            </button>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Volume2 className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm font-medium">
                  Audio {audioLanguage ? languageLabels[audioLanguage] : 'Indonesia'}
                </p>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  animate={{ width: isPlaying ? '100%' : '0%' }}
                  transition={{ duration: 3, ease: 'linear' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-4 space-y-3">
          {isElderly ? (
            <>
              <Button
                variant="elderly"
                onClick={handleComplete}
                disabled={!hasPlayedAudio}
                className="w-full gap-2"
              >
                <Check className="w-5 h-5" />
                Saya Sudah Selesai
              </Button>
              {!isLastStep && (
                <Button
                  variant="elderlySecondary"
                  onClick={handleComplete}
                  disabled={!hasPlayedAudio}
                  className="w-full gap-2"
                >
                  <SkipForward className="w-5 h-5" />
                  Lanjut
                </Button>
              )}
            </>
          ) : (
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleComplete}
                className="flex-1"
              >
                <Check className="w-5 h-5 mr-2" />
                Selesai
              </Button>
              {!isLastStep && (
                <Button
                  onClick={handleComplete}
                  className="flex-1"
                >
                  Lanjut
                  <SkipForward className="w-5 h-5 ml-2" />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
