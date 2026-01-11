import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Volume2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { AudioPlayer } from '@/components/audio/AudioPlayer';
import { getAudioPath } from '@/lib/audio-utils';

const doaList = [
  {
    id: 1,
    file: 'doa-niat-ihram',
    title: 'Doa Niat Ihram',
    arabic: 'لَبَّيْكَ اللَّهُمَّ حَجًّا',
    latin: 'Labbaika Allahumma Hajjan',
    meaning: 'Aku penuhi panggilan-Mu ya Allah untuk berhaji',
  },
  {
    id: 2,
    file: 'talbiyah',
    title: 'Talbiyah',
    arabic: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ',
    latin: 'Labbaikallahumma labbaik, labbaika laa syariika laka labbaik',
    meaning: 'Aku penuhi panggilan-Mu ya Allah, aku penuhi panggilan-Mu. Tidak ada sekutu bagi-Mu.',
  },
  {
    id: 3,
    file: 'doa-melihat-kabah',
    title: 'Doa Melihat Kabah',
    arabic: 'اللَّهُمَّ زِدْ هَذَا الْبَيْتَ تَشْرِيفًا وَتَعْظِيمًا',
    latin: 'Allahumma zid hazal baita tasyrifan wa ta\'zhiman',
    meaning: 'Ya Allah, tambahkanlah kemuliaan dan keagungan rumah ini',
  },
  {
    id: 4,
    file: 'doa-bukit-safa',
    title: 'Doa di Bukit Safa',
    arabic: 'إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ',
    latin: 'Innash-shafa wal-marwata min sya\'airillah',
    meaning: 'Sesungguhnya Safa dan Marwah adalah sebagian dari syiar Allah',
  },
  {
    id: 5,
    file: 'doa-arafah',
    title: 'Doa di Arafah',
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    latin: 'Laa ilaaha illallahu wahdahu laa syariikalah',
    meaning: 'Tiada Tuhan selain Allah Yang Maha Esa, tiada sekutu bagi-Nya',
  },
];

export default function Doa() {
  const { audioLanguage, mode } = useApp();
  const [activeDoa, setActiveDoa] = useState<typeof doaList[0] | null>(null);

  const isElderly = mode === 'lansia';

  return (
    <PageContainer>
      <header className="safe-top px-6 pt-6 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-foreground">
            Kumpulan Doa Haji
          </h1>
          <p className="text-muted-foreground mt-1">
            Doa dan dzikir selama ibadah haji
          </p>
        </motion.div>
      </header>

      <main className={`px-6 py-4 ${activeDoa ? 'pb-40' : 'pb-24'}`}>
        <div className="space-y-4">
          {doaList.map((doa, index) => (
            <motion.div
              key={doa.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-card rounded-2xl p-5 border transition-all shadow-soft ${activeDoa?.id === doa.id ? 'border-primary ring-1 ring-primary/20' : 'border-border'
                }`}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-semibold text-foreground">{doa.title}</h3>
                <button
                  onClick={() => setActiveDoa(doa)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${activeDoa?.id === doa.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  aria-label={`Putar audio ${doa.title}`}
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* Arabic */}
              <p className="font-arabic text-2xl text-foreground text-right leading-loose mb-3" dir="rtl">
                {doa.arabic}
              </p>

              {/* Divider */}
              <div className="divider-gold my-4" />

              {/* Latin */}
              <p className={`text-primary font-medium italic mb-2 ${isElderly ? 'text-elderly-base' : ''}`}>
                {doa.latin}
              </p>

              {/* Meaning */}
              <p className={`text-muted-foreground ${isElderly ? 'text-elderly-base' : 'text-sm'}`}>
                Artinya: {doa.meaning}
              </p>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Floating Audio Player for Doa */}
      <AnimatePresence>
        {activeDoa && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-20 left-4 right-4 bg-card border border-border shadow-2xl rounded-2xl p-4 safe-bottom z-50 mb-2"
          >
            <div className="flex justify-between items-center mb-4 px-1">
              <span className="text-xs font-bold text-primary tracking-widest uppercase">Sedang Diputar</span>
              <button
                onClick={() => setActiveDoa(null)}
                className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-muted/80"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <AudioPlayer
              key={activeDoa.id} // Reset player when doa changes
              src={getAudioPath(audioLanguage, 'doa', `${activeDoa.file}.mp3`)}
              autoPlay={true}
              mode={mode}
              label={activeDoa.title}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </PageContainer>
  );
}
