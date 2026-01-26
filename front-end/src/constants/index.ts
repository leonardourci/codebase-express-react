export const API_CONSTANTS = {
    MAX_URL_LENGTH: 2083,
    DEFAULT_TIMEOUT: 10000,
} as const

export const STORAGE_KEYS = {
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
    USER: 'user',
} as const

export const UI_CONSTANTS = {
    DEBOUNCE_DELAY: 300,
    TOAST_DURATION: 5000,
} as const