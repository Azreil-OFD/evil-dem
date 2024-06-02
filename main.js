import { app, BrowserWindow } from 'electron';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: join(__dirname, 'preload.js'),
        },
    });

    win.loadURL('http://localhost:3000');
};

app.whenReady().then(() => {
    const nuxtProcess = exec('npm run start');

    nuxtProcess.stdout.on('data', (data) => {
        console.log(`Nuxt: ${data}`);
    });

    nuxtProcess.stderr.on('data', (data) => {
        console.error(`Nuxt Error: ${data}`);
    });

    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
