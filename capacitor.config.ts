import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.vercel.corpuschristi',
  appName: 'Corpus Christi',
  webDir: 'public', // Using public just to satisfy Capacitor requirements, since we're using a server url.
  bundledWebRuntime: false,
  server: {
    url: 'https://corpus-christi.vercel.app',
    cleartext: true,
    errorPath: 'offline.html'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#1A2744",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#1A2744",
    }
  }
};

export default config;
