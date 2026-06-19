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
};

export default config;
