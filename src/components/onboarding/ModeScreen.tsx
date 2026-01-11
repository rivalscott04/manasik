import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AppMode } from '@/contexts/AppContext';
import { Users, Heart, Smartphone, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface ModeScreenProps {
  onNext: (mode: AppMode) => void;
}

const modes: { id: AppMode; name: string; description: string; icon: React.ElementType; features: string[] }[] = [
  {
    id: 'lansia',
    name: 'Mode Lansia',
    description: 'Tampilan besar dan audio otomatis',
    icon: Heart,
    features: ['Audio diputar otomatis', 'Tampilan huruf besar', 'Tahapan berurutan'],
  },
  {
    id: 'pendamping',
    name: 'Mode Pendamping',
    description: 'Kontrol cepat untuk membimbing jamaah',
    icon: Users,
    features: ['Akses semua tahapan', 'Catatan pendamping', 'Kontrol audio manual'],
  },
  {
    id: 'umum',
    name: 'Mode Umum',
    description: 'Tampilan modern dan interaktif',
    icon: Smartphone,
    features: ['Tampilan modern', 'Peta interaktif', 'Akses bebas tahapan'],
  },
];

export function ModeScreen({ onNext }: ModeScreenProps) {
  const [selected, setSelected] = useState<AppMode | null>(null);

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
          <p className="text-sm text-muted-foreground mb-2">Langkah 2 dari 2</p>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Pilih Mode Penggunaan
          </h1>
          <p className="text-muted-foreground mt-2">
            Mode dapat diubah kapan saja melalui pengaturan.
          </p>
        </motion.div>
      </header>

      {/* Mode Options */}
      <main className="flex-1 px-6 py-4 overflow-auto">
        <div className="space-y-4 max-w-lg mx-auto">
          {modes.map((mode, index) => {
            const Icon = mode.icon;
            const isSelected = selected === mode.id;

            return (
              <motion.button
                key={mode.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                onClick={() => setSelected(mode.id)}
                className={`w-full p-5 rounded-2xl border-2 transition-all duration-200 text-left ${
                  isSelected
                    ? 'border-primary bg-primary/5 shadow-medium'
                    : 'border-border bg-card hover:border-primary/50 hover:bg-muted/50'
                }`}
                aria-pressed={isSelected}
                aria-label={`Pilih ${mode.name}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {isSelected ? (
                      <Check className="w-7 h-7" />
                    ) : (
                      <Icon className="w-7 h-7" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-lg font-semibold ${
                      isSelected ? 'text-primary' : 'text-foreground'
                    }`}>
                      {mode.name}
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">{mode.description}</p>
                    <ul className="space-y-1">
                      {mode.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            isSelected ? 'bg-primary' : 'bg-muted-foreground'
                          }`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.button>
            );
          })}
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
            aria-label="Masuk ke beranda dengan mode yang dipilih"
          >
            Masuk ke Beranda
          </Button>
        </div>
      </footer>
    </div>
  );
}
