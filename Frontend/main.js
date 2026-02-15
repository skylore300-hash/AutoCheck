const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');

let mainWindow;
let splashWindow;

function createSplashWindow() {
  splashWindow = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    alwaysOnTop: true,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  splashWindow.loadFile('src/screens/splash.html');
  
  // Fermer le splash après 3 secondes et ouvrir la fenêtre principale
  setTimeout(() => {
    splashWindow.close();
    createMainWindow();
  }, 3000);
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    show: false,
    icon: path.join(__dirname, 'assets/icon.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  });

  // Charger l'écran de connexion par défaut
  mainWindow.loadFile('src/screens/login.html');
  
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Menu de l'application
  createApplicationMenu();

  // Dev tools en mode développement
  if (process.argv.includes('--dev')) {
    mainWindow.webContents.openDevTools();
  }
}

function createApplicationMenu() {
  const template = [
    {
      label: 'AutoCheck',
      submenu: [
        {
          label: 'Tableau de bord',
          accelerator: 'CmdOrCtrl+D',
          click: () => {
            mainWindow.loadFile('src/screens/dashboard.html');
          }
        },
        {
          label: 'Recherche',
          accelerator: 'CmdOrCtrl+S',
          click: () => {
            mainWindow.loadFile('src/screens/search.html');
          }
        },
        {
          label: 'Scanner caméra',
          accelerator: 'CmdOrCtrl+C',
          click: () => {
            mainWindow.loadFile('src/screens/camera.html');
          }
        },
        {
          label: 'Historique',
          accelerator: 'CmdOrCtrl+H',
          click: () => {
            mainWindow.loadFile('src/screens/history.html');
          }
        },
        {
          label: 'Signalements',
          click: () => {
            mainWindow.loadFile('src/screens/reports.html');
          }
        },
        {
          label: 'Notifications',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            mainWindow.loadFile('src/screens/notifications.html');
          }
        },
        {
          label: 'Utilisateurs',
          accelerator: 'CmdOrCtrl+U',
          click: () => {
            mainWindow.loadFile('src/screens/users.html');
          }
        },
        {
          label: 'Mode Hors Ligne',
          click: () => {
            mainWindow.loadFile('src/screens/offline.html');
          }
        },
        { type: 'separator' },
        {
          label: 'Paramètres',
          accelerator: 'CmdOrCtrl+,',
          click: () => {
            mainWindow.loadFile('src/screens/settings.html');
          }
        },
        { type: 'separator' },
        {
          label: 'Déconnexion',
          click: () => {
            mainWindow.loadFile('src/screens/login.html');
          }
        },
        {
          label: 'Quitter',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Affichage',
      submenu: [
        { role: 'reload', label: 'Actualiser' },
        { role: 'forceReload', label: 'Forcer l\'actualisation' },
        { role: 'toggleDevTools', label: 'Outils de développement' },
        { type: 'separator' },
        { role: 'resetZoom', label: 'Zoom normal' },
        { role: 'zoomIn', label: 'Zoomer' },
        { role: 'zoomOut', label: 'Dézoomer' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Plein écran' }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// Events IPC pour la communication avec les renderers
ipcMain.on('navigate-to', (event, page) => {
  mainWindow.loadFile(`src/screens/${page}.html`);
});

ipcMain.on('show-notification', (event, title, body) => {
  // Afficher une notification système
  const { Notification } = require('electron');
  new Notification({ title, body }).show();
});

ipcMain.on('get-app-version', (event) => {
  event.reply('app-version', app.getVersion());
});

app.whenReady().then(createSplashWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createSplashWindow();
  }
});

// Gérer les certificats SSL non sécurisés (pour le développement)
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  if (url.startsWith('https://localhost') || url.startsWith('https://127.0.0.1')) {
    event.preventDefault();
    callback(true);
  } else {
    callback(false);
  }
});