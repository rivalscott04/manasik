
import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface AudioPlayerProps {
    src: string;
    autoPlay?: boolean;
    onEnded?: () => void;
    mode?: 'lansia' | 'umum' | 'pendamping' | null;
    label?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
    src,
    autoPlay = false,
    onEnded,
    mode = 'umum',
    label = 'Audio Panduan',
}) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    const isElderly = mode === 'lansia';

    useEffect(() => {
        if (audioRef.current) {
            if (autoPlay) {
                audioRef.current.play().catch(err => console.log("Autoplay blocked:", err));
                setIsPlaying(true);
            } else {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        }
    }, [src, autoPlay]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const total = audioRef.current.duration;
            setProgress((current / total) * 100);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleEnded = () => {
        setIsPlaying(false);
        setProgress(100);
        if (onEnded) onEnded();
    };

    const handleRestart = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    return (
        <div className={`w-full ${isElderly ? 'py-2' : ''}`}>
            <audio
                ref={audioRef}
                src={src}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
            />

            <div className="flex items-center gap-4">
                {/* Play/Pause Button */}
                <button
                    onClick={togglePlay}
                    className={`shrink-0 rounded-full flex items-center justify-center transition-all shadow-soft active:scale-95 ${isElderly
                        ? 'w-16 h-16 bg-primary text-primary-foreground'
                        : 'w-12 h-12 bg-muted text-foreground hover:bg-muted/80'
                        }`}
                    aria-label={isPlaying ? 'Jeda' : 'Putar'}
                >
                    {isPlaying ? (
                        <Pause className={isElderly ? 'w-8 h-8' : 'w-5 h-5'} />
                    ) : (
                        <Play className={`${isElderly ? 'w-8 h-8 ml-1' : 'w-5 h-5 ml-0.5'}`} />
                    )}
                </button>

                {/* Progress & Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Volume2 className="w-4 h-4 text-primary/60" />
                            <span className={`font-medium truncate ${isElderly ? 'text-elderly-base' : 'text-sm'}`}>
                                {label}
                            </span>
                        </div>

                        {isElderly && (
                            <button
                                onClick={handleRestart}
                                className="flex items-center gap-1.5 text-primary font-bold text-sm bg-primary/10 px-4 py-2 rounded-full active:bg-primary/20"
                            >
                                <RotateCcw className="w-4 h-4" />
                                ULANGI
                            </button>
                        )}
                    </div>

                    {/* Progress Bar Container */}
                    <div className={`relative w-full bg-muted rounded-full overflow-hidden ${isElderly ? 'h-3' : 'h-1.5'}`}>
                        <motion.div
                            className="absolute left-0 top-0 h-full bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
