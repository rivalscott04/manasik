import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AudioLanguage } from '@/contexts/AppContext';
import { Volume2, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface LanguageScreenProps {
  onNext: (language: AudioLanguage) => void;
}

const languages: { id: AudioLanguage; name: string; region: string }[] = [
  { id: 'indonesia', name: 'Bahasa Indonesia', region: 'Nasional' },
  { id: 'sasak', name: 'Bahasa Sasak', region: 'Lombok' },
  { id: 'samawa', name: 'Bahasa Samawa', region: 'Sumbawa' },
  { id: 'mbojo', name: 'Bahasa Mbojo', region: 'Bima' },
];

export function LanguageScreen({ onNext }: LanguageScreenProps) {
  const [selected, setSelected] = useState<AudioLanguage | null>(null);

  const handleContinue = () => {
    if (selected) {
      onNext(selected);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="safe-top px-6 pt-8 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-sm text-muted-foreground mb-2">Langkah 1 dari 2</p>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Pilih Bahasa Audio Panduan
          </h1>
          <p className="text-muted-foreground mt-2">
            Bahasa audio akan diputar di setiap tahapan manasik. Tampilan aplikasi tetap menggunakan Bahasa Indonesia.
          </p>
        </motion.div>
      </header>

      {/* Language Options */}
      <main className="flex-1 px-6 py-4">
        <div className="space-y-3 max-w-lg mx-auto">
          {languages.map((lang, index) => (
            <motion.button
              key={lang.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              onClick={() => setSelected(lang.id)}
              className={`w-full p-5 rounded-2xl border-2 transition-all duration-200 text-left flex items-center gap-4 ${
                selected === lang.id
                  ? 'border-primary bg-primary/5 shadow-medium'
                  : 'border-border bg-card hover:border-primary/50 hover:bg-muted/50'
              }`}
              aria-pressed={selected === lang.id}
              aria-label={`Pilih ${lang.name} sebagai bahasa audio`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                selected === lang.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                {selected === lang.id ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <Volume2 className="w-6 h-6" />
                )}
              </div>
              <div className="flex-1">
                <p className={`text-lg font-semibold ${
                  selected === lang.id ? 'text-primary' : 'text-foreground'
                }`}>
                  {lang.name}
                </p>
                <p className="text-sm text-muted-foreground">{lang.region}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </main>

      {/* Footer with button */}
      <footer className="px-6 py-6 safe-bottom">
        <div className="max-w-lg mx-auto">
          <Button
            variant="elderly"
            onClick={handleContinue}
            disabled={!selected}
            className="w-full"
            aria-label="Gunakan bahasa ini dan lanjutkan"
          >
            Gunakan Bahasa Ini
          </Button>
        </div>
      </footer>
    </div>
  );
}
