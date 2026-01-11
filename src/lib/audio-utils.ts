
export const LANG_MAP: Record<string, string> = {
    indonesia: 'id',
    sasak: 'sas',
    samawa: 'smw',
    mbojo: 'mbj',
};

export type AudioCategory = 'doa' | 'manasik' | 'system';

/**
 * Generates the absolute path to an audio asset
 */
export const getAudioPath = (
    lang: string | null,
    category: AudioCategory,
    fileName: string
): string => {
    const langCode = lang ? LANG_MAP[lang.toLowerCase()] || 'id' : 'id';

    // System sounds are usually not localized
    if (category === 'system') {
        return `/audio/system/${fileName}`;
    }

    return `/audio/${langCode}/${category}/${fileName}`;
};
