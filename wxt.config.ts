import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'iMidMan Scam Detector',
    description: 'Detect and alert scams in real-time',
    version: '0.1.0',
    permissions: ['tabs', 'scripting', 'storage'],
    host_permissions: ['https://*/*', 'http://*/*'],
    icons: {
      16: 'icon/icon-16.png',
      48: 'icon/icon-48.png',
      128: 'icon/icon-128.png',
    },
  },
});
