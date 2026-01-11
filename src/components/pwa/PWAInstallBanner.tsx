import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';
import { usePWAInstall } from '@/hooks/usePWAInstall';

export function PWAInstallBanner() {
    const { isInstallable, isInstalled, isDismissed, install, dismiss } = usePWAInstall();

    // Don't show if already installed, dismissed, or not installable
    if (isInstalled || isDismissed || !isInstallable) {
        return null;
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed top-0 left-0 right-0 z-50 safe-top"
            >
                <div className="mx-4 mt-4 bg-gradient-to-r from-primary to-primary/90 rounded-2xl shadow-lg border border-primary/20 overflow-hidden">
                    <div className="flex items-center gap-3 p-4">
                        {/* Icon */}
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Download className="w-6 h-6 text-white" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-white text-sm">
                                Install Aplikasi Manasik
                            </p>
                            <p className="text-white/80 text-xs mt-0.5">
                                Akses offline & lebih cepat
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                                onClick={install}
                                className="bg-white text-primary font-semibold px-4 py-2 rounded-xl text-sm hover:bg-white/90 transition-colors"
                            >
                                Install
                            </button>
                            <button
                                onClick={dismiss}
                                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                aria-label="Tutup"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
