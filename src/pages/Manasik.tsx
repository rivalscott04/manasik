import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { useApp } from '@/contexts/AppContext';
import { ChevronRight, Check, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const tahapanList = [
  { id: 1, title: 'Ihram', description: 'Niat dan berpakaian ihram' },
  { id: 2, title: 'Tawaf Qudum', description: 'Mengelilingi Kabah 7 kali' },
  { id: 3, title: 'Sai', description: 'Berjalan antara Safa dan Marwah' },
  { id: 4, title: 'Wukuf di Arafah', description: 'Berdiam di padang Arafah' },
  { id: 5, title: 'Mabit di Muzdalifah', description: 'Bermalam di Muzdalifah' },
  { id: 6, title: 'Melontar Jumrah', description: 'Melontar jumrah aqabah' },
  { id: 7, title: 'Tahallul', description: 'Mencukur atau memotong rambut' },
  { id: 8, title: 'Tawaf Ifadhah', description: 'Tawaf rukun haji' },
  { id: 9, title: 'Mabit di Mina', description: 'Bermalam di Mina' },
  { id: 10, title: 'Tawaf Wada', description: 'Tawaf perpisahan' },
];

export default function Manasik() {
  const { currentStep, mode } = useApp();
  const navigate = useNavigate();

  const handleSelectTahapan = (stepNumber: number) => {
    // Mode lansia tidak boleh lompat tahapan
    if (mode === 'lansia' && stepNumber > currentStep) {
      return;
    }
    navigate(`/manasik/tahapan/${stepNumber}`);
  };

  return (
    <PageContainer>
      <header className="safe-top px-6 pt-6 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-foreground">
            Tahapan Manasik Haji
          </h1>
          <p className="text-muted-foreground mt-1">
            {mode === 'lansia' 
              ? 'Ikuti tahapan secara berurutan'
              : 'Pilih tahapan untuk mempelajari'}
          </p>
        </motion.div>
      </header>

      <main className="px-6 py-4">
        <div className="space-y-3">
          {tahapanList.map((tahapan, index) => {
            const isCompleted = tahapan.id < currentStep;
            const isCurrent = tahapan.id === currentStep;
            const isLocked = mode === 'lansia' && tahapan.id > currentStep;

            return (
              <motion.button
                key={tahapan.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleSelectTahapan(tahapan.id)}
                disabled={isLocked}
                className={`w-full p-4 rounded-xl border text-left flex items-center gap-4 transition-all ${
                  isLocked
                    ? 'bg-muted/50 border-border opacity-60 cursor-not-allowed'
                    : isCurrent
                    ? 'bg-primary/5 border-primary shadow-soft'
                    : isCompleted
                    ? 'bg-card border-border hover:border-primary/50'
                    : 'bg-card border-border hover:border-primary/50 hover:shadow-soft'
                }`}
                aria-label={`${tahapan.title}: ${tahapan.description}${isLocked ? ', terkunci' : ''}`}
              >
                {/* Step Number / Status */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  isCompleted
                    ? 'bg-success text-success-foreground'
                    : isCurrent
                    ? 'bg-primary text-primary-foreground'
                    : isLocked
                    ? 'bg-muted text-muted-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : isLocked ? (
                    <Lock className="w-4 h-4" />
                  ) : (
                    <span className="font-semibold">{tahapan.id}</span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold ${
                    isCurrent ? 'text-primary' : 'text-foreground'
                  }`}>
                    {tahapan.title}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {tahapan.description}
                  </p>
                </div>

                {/* Arrow */}
                {!isLocked && (
                  <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                )}
              </motion.button>
            );
          })}
        </div>
      </main>
    </PageContainer>
  );
}
