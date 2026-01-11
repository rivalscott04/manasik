import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { useApp, AppMode, AudioLanguage } from '@/contexts/AppContext';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import {
  Settings, Download, RefreshCw, Info, ChevronRight, Volume2,
  Smartphone, Check, User, Users, Accessibility,
  Globe, AlertTriangle, Heart
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

// Reusable Option Card Component
interface OptionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  selected?: boolean;
  onClick: () => void;
}

function OptionCard({ icon, title, description, selected, onClick }: OptionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-2xl border text-left flex items-center gap-4 transition-all ${selected
        ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
        : 'border-border bg-card hover:border-primary/50'
        }`}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selected ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
        }`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className={`font-semibold ${selected ? 'text-primary' : 'text-foreground'}`}>
          {title}
        </p>
        <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
      </div>
      {selected && (
        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
          <Check className="w-4 h-4 text-white" />
        </div>
      )}
    </button>
  );
}

// Menu Item Component
interface MenuItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
  onClick: () => void;
  variant?: 'default' | 'highlight' | 'destructive';
  disabled?: boolean;
}

function MenuItem({ icon: Icon, title, description, onClick, variant = 'default', disabled }: MenuItemProps) {
  const variantStyles = {
    default: 'bg-card border-border hover:bg-muted/50',
    highlight: 'bg-primary/5 border-primary/30 hover:bg-primary/10',
    destructive: 'bg-destructive/5 border-destructive/20 hover:bg-destructive/10',
  };

  const iconStyles = {
    default: 'bg-muted text-muted-foreground',
    highlight: 'bg-primary/10 text-primary',
    destructive: 'bg-destructive/10 text-destructive',
  };

  const textStyles = {
    default: 'text-foreground',
    highlight: 'text-primary',
    destructive: 'text-destructive',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full p-4 rounded-xl border text-left flex items-center gap-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]}`}
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconStyles[variant]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`font-medium ${textStyles[variant]}`}>{title}</p>
        <p className="text-sm text-muted-foreground truncate">{description}</p>
      </div>
      <ChevronRight className={`w-5 h-5 ${variant === 'destructive' ? 'text-destructive/50' : 'text-muted-foreground'}`} />
    </button>
  );
}

export default function Lainnya() {
  const { mode, audioLanguage, setMode, setAudioLanguage, resetApp } = useApp();
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const navigate = useNavigate();

  // Sheet states
  const [modeSheetOpen, setModeSheetOpen] = useState(false);
  const [audioSheetOpen, setAudioSheetOpen] = useState(false);
  const [aboutSheetOpen, setAboutSheetOpen] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  const modeOptions: { value: AppMode; icon: React.ReactNode; title: string; description: string }[] = [
    { value: 'lansia', icon: <Accessibility className="w-6 h-6" />, title: 'Mode Lansia', description: 'Tampilan besar, audio otomatis, navigasi sederhana' },
    { value: 'pendamping', icon: <Users className="w-6 h-6" />, title: 'Mode Pendamping', description: 'Panduan lengkap untuk mendampingi jamaah' },
    { value: 'umum', icon: <User className="w-6 h-6" />, title: 'Mode Umum', description: 'Tampilan standar dengan semua fitur' },
  ];

  const audioOptions: { value: AudioLanguage; title: string; description: string }[] = [
    { value: 'indonesia', title: 'Bahasa Indonesia', description: 'Audio dalam Bahasa Indonesia baku' },
    { value: 'sasak', title: 'Bahasa Sasak', description: 'Audio dalam bahasa Sasak Lombok' },
    { value: 'samawa', title: 'Bahasa Samawa', description: 'Audio dalam bahasa Sumbawa' },
    { value: 'mbojo', title: 'Bahasa Mbojo', description: 'Audio dalam bahasa Bima' },
  ];

  const modeLabels: Record<string, string> = {
    lansia: 'Mode Lansia',
    pendamping: 'Mode Pendamping',
    umum: 'Mode Umum',
  };

  const languageLabels: Record<string, string> = {
    indonesia: 'Bahasa Indonesia',
    sasak: 'Bahasa Sasak',
    samawa: 'Bahasa Samawa',
    mbojo: 'Bahasa Mbojo',
  };

  const handleReset = () => {
    resetApp();
    navigate('/onboarding', { replace: true });
  };

  return (
    <PageContainer>
      <header className="safe-top px-6 pt-6 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-foreground">Lainnya</h1>
          <p className="text-muted-foreground mt-1">Pengaturan dan informasi</p>
        </motion.div>
      </header>

      <main className="px-6 py-4">
        <div className="space-y-2">
          {/* Mode Settings */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0 }}>
            <MenuItem
              icon={Settings}
              title="Pengaturan Mode"
              description={mode ? modeLabels[mode] : 'Belum dipilih'}
              onClick={() => setModeSheetOpen(true)}
            />
          </motion.div>

          {/* Audio Language */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }}>
            <MenuItem
              icon={Volume2}
              title="Bahasa Audio"
              description={audioLanguage ? languageLabels[audioLanguage] : 'Belum dipilih'}
              onClick={() => setAudioSheetOpen(true)}
            />
          </motion.div>

          {/* PWA Install */}
          {(isInstallable || isInstalled) && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <MenuItem
                icon={isInstalled ? Check : Smartphone}
                title={isInstalled ? 'Aplikasi Terinstall' : 'Install Aplikasi'}
                description={isInstalled ? 'Manasik sudah diinstall di perangkat' : 'Akses lebih cepat dan offline'}
                onClick={isInstalled ? () => { } : install}
                variant={isInstalled ? 'default' : 'highlight'}
                disabled={isInstalled}
              />
            </motion.div>
          )}

          {/* Download Audio */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
            <MenuItem
              icon={Download}
              title="Unduh Audio Offline"
              description="Simpan audio untuk digunakan tanpa internet"
              onClick={() => { }}
            />
          </motion.div>

          {/* About */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <MenuItem
              icon={Info}
              title="Tentang Aplikasi"
              description="Versi 1.1.0"
              onClick={() => setAboutSheetOpen(true)}
            />
          </motion.div>

          {/* Reset */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
            <MenuItem
              icon={RefreshCw}
              title="Atur Ulang Aplikasi"
              description="Kembali ke pengaturan awal"
              onClick={() => setResetDialogOpen(true)}
              variant="destructive"
            />
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center pb-8"
        >
          <div className="flex flex-col items-center justify-center gap-1">
            <p className="text-sm text-muted-foreground">Panduan Manasik Haji</p>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/60 uppercase tracking-widest font-medium mt-2">
              <span>Dibuat dengan</span>
              <Heart className="w-3 h-3 text-red-500 fill-red-500" />
              <span>oleh Kanwil Kemenhaj NTB</span>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Mode Selection Sheet */}
      <Sheet open={modeSheetOpen} onOpenChange={setModeSheetOpen}>
        <SheetContent side="bottom" className="rounded-t-3xl">
          <SheetHeader className="text-left pb-4">
            <SheetTitle>Pengaturan Mode</SheetTitle>
            <SheetDescription>Pilih mode tampilan yang sesuai dengan kebutuhan Anda</SheetDescription>
          </SheetHeader>
          <div className="space-y-3 pb-6">
            {modeOptions.map((option) => (
              <OptionCard
                key={option.value}
                icon={option.icon}
                title={option.title}
                description={option.description}
                selected={mode === option.value}
                onClick={() => {
                  setMode(option.value);
                  setModeSheetOpen(false);
                }}
              />
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Audio Language Sheet */}
      <Sheet open={audioSheetOpen} onOpenChange={setAudioSheetOpen}>
        <SheetContent side="bottom" className="rounded-t-3xl">
          <SheetHeader className="text-left pb-4">
            <SheetTitle>Bahasa Audio</SheetTitle>
            <SheetDescription>Pilih bahasa untuk audio panduan manasik</SheetDescription>
          </SheetHeader>
          <div className="space-y-3 pb-6">
            {audioOptions.map((option) => (
              <OptionCard
                key={option.value}
                icon={<Globe className="w-6 h-6" />}
                title={option.title}
                description={option.description}
                selected={audioLanguage === option.value}
                onClick={() => {
                  setAudioLanguage(option.value);
                  setAudioSheetOpen(false);
                }}
              />
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* About Sheet */}
      <Sheet open={aboutSheetOpen} onOpenChange={setAboutSheetOpen}>
        <SheetContent side="bottom" className="rounded-t-3xl">
          <SheetHeader className="text-left pb-4">
            <SheetTitle>Tentang Aplikasi</SheetTitle>
            <SheetDescription>Informasi tentang aplikasi Manasik Haji</SheetDescription>
          </SheetHeader>
          <div className="space-y-4 pb-6">
            <div className="bg-muted rounded-2xl p-4">
              <p className="font-semibold text-foreground text-primary">Manasik Haji SASAMBO</p>
              <p className="text-sm text-muted-foreground mt-1">Versi 1.1.0</p>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Aplikasi panduan manasik haji yang dirancang khusus untuk jamaah haji dari Provinsi Nusa Tenggara Barat.</p>
              <p>Dilengkapi audio panduan dalam bahasa daerah Sasambo (Sasak, Samawa, Mbojo) untuk memudahkan pemahaman.</p>
            </div>
            <div className="pt-6 border-t border-border mt-2">
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
                  <span>Dibuat dengan</span>
                  <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                </div>
                <p className="text-xs font-bold text-foreground text-center max-w-[200px] leading-tight text-primary">
                  Kantor Wilayah Kementerian Haji dan Umroh Provinsi NTB
                </p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Reset Confirmation Dialog */}
      <AlertDialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <AlertDialogContent className="rounded-2xl max-w-sm mx-4">
          <AlertDialogHeader>
            <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-2">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <AlertDialogTitle className="text-center">Atur Ulang Aplikasi?</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Semua pengaturan dan progress Anda akan dihapus. Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-col">
            <AlertDialogAction
              onClick={handleReset}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 w-full"
            >
              Ya, Atur Ulang
            </AlertDialogAction>
            <AlertDialogCancel className="w-full mt-0">Batal</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageContainer>
  );
}
