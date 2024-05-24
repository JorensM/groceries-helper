console.log('vercel url: ', import.meta.env.VITE_PUBLIC_VERCEL_URL, import.meta.env.VERCEL_URL);

export const APP_URL = import.meta.env.ENVIRONMENT == 'vercel' ? 
    import.meta.env.VITE_PUBLIC_VERCEL_URL : 
    import.meta.env.VITE_PUBLIC_APP_URL;