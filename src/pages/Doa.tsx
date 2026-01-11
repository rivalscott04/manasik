import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

const doaList = [
  {
    id: 1,
    title: 'Doa Niat Ihram',
    arabic: 'لَبَّيْكَ اللَّهُمَّ حَجًّا',
    latin: 'Labbaika Allahumma Hajjan',
    meaning: 'Aku penuhi panggilan-Mu ya Allah untuk berhaji',
  },
  {
    id: 2,
    title: 'Talbiyah',
    arabic: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ',
    latin: 'Labbaikallahumma labbaik, labbaika laa syariika laka labbaik',
    meaning: 'Aku penuhi panggilan-Mu ya Allah, aku penuhi panggilan-Mu. Tidak ada sekutu bagi-Mu.',
  },
  {
    id: 3,
    title: 'Doa Melihat Kabah',
    arabic: 'اللَّهُمَّ زِدْ هَذَا الْبَيْتَ تَشْرِيفًا وَتَعْظِيمًا',
    latin: 'Allahumma zid hazal baita tasyrifan wa ta\'zhiman',
    meaning: 'Ya Allah, tambahkanlah kemuliaan dan keagungan rumah ini',
  },
  {
    id: 4,
    title: 'Doa di Bukit Safa',
    arabic: 'إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ',
    latin: 'Innash-shafa wal-marwata min sya\'airillah',
    meaning: 'Sesungguhnya Safa dan Marwah adalah sebagian dari syiar Allah',
  },
  {
    id: 5,
    title: 'Doa di Arafah',
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    latin: 'Laa ilaaha illallahu wahdahu laa syariikalah',
    meaning: 'Tiada Tuhan selain Allah Yang Maha Esa, tiada sekutu bagi-Nya',
  },
];

export default function Doa() {
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

      <main className="px-6 py-4">
        <div className="space-y-4">
          {doaList.map((doa, index) => (
            <motion.div
              key={doa.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl p-5 border border-border shadow-soft"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-semibold text-foreground">{doa.title}</h3>
                <button
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
                  aria-label={`Putar audio ${doa.title}`}
                >
                  <Volume2 className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
              
              {/* Arabic */}
              <p className="font-arabic text-2xl text-foreground text-right leading-loose mb-3" dir="rtl">
                {doa.arabic}
              </p>
              
              {/* Divider */}
              <div className="divider-gold my-4" />
              
              {/* Latin */}
              <p className="text-primary font-medium italic mb-2">
                {doa.latin}
              </p>
              
              {/* Meaning */}
              <p className="text-sm text-muted-foreground">
                Artinya: {doa.meaning}
              </p>
            </motion.div>
          ))}
        </div>
      </main>
    </PageContainer>
  );
}
