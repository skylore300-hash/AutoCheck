// Navigation et utilitaires communs pour AutoCheck
const { ipcRenderer } = require('electron');

class AutoCheckApp {
  constructor() {
    this.currentUser = null;
    this.isOfflineMode = false;
    this.notifications = [];
  }

  // Navigation entre les écrans
  navigateTo(page) {
    ipcRenderer.send('navigate-to', page);
  }

  // Authentification
  login(credentials) {
    // Simulation d'authentification
    return new Promise((resolve) => {
      setTimeout(() => {
        this.currentUser = {
          id: 1,
          name: credentials.email.split('@')[0],
          email: credentials.email,
          role: credentials.role,
          matricule: credentials.matricule
        };
        localStorage.setItem('autocheck_user', JSON.stringify(this.currentUser));
        resolve(this.currentUser);
      }, 1500);
    });
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('autocheck_user');
    this.navigateTo('login');
  }

  // Récupérer l'utilisateur connecté
  getCurrentUser() {
    if (!this.currentUser) {
      const stored = localStorage.getItem('autocheck_user');
      if (stored) {
        this.currentUser = JSON.parse(stored);
      }
    }
    return this.currentUser;
  }

  // Recherche de véhicule
  async searchVehicle(licensePlate) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulation de données
        const isStolen = Math.random() < 0.1; // 10% de chance d'être volé
        const vehicleData = {
          licensePlate: licensePlate.toUpperCase(),
          make: ['Toyota', 'BMW', 'Mercedes', 'Volkswagen', 'Peugeot'][Math.floor(Math.random() * 5)],
          model: ['Corolla', 'X3', 'Classe A', 'Golf', '308'][Math.floor(Math.random() * 5)],
          color: ['Blanc', 'Noir', 'Gris', 'Bleu', 'Rouge'][Math.floor(Math.random() * 5)],
          year: 2015 + Math.floor(Math.random() * 8),
          vin: this.generateVIN(),
          status: isStolen ? 'stolen' : 'safe',
          insurance: {
            company: 'Allianz Assurance',
            valid: Math.random() > 0.2, // 80% de chance d'avoir une assurance valide
            expires: '2024-12-31'
          },
          owner: {
            name: 'Jean Dupont',
            address: '123 Rue de la Paix, Paris'
          },
          searchTimestamp: new Date().toISOString()
        };

        // Ajouter à l'historique
        this.addToHistory(vehicleData);
        
        // Si volé, envoyer une notification
        if (isStolen) {
          this.showNotification('Véhicule Volé Détecté!', `Plaque: ${licensePlate}`, 'error');
        }

        resolve(vehicleData);
      }, 2000);
    });
  }

  // Générer un VIN aléatoire
  generateVIN() {
    const chars = 'ABCDEFGHJKLMNPRSTUVWXYZ0123456789';
    let vin = '';
    for (let i = 0; i < 17; i++) {
      vin += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return vin;
  }

  // Ajouter à l'historique
  addToHistory(vehicleData) {
    let history = JSON.parse(localStorage.getItem('search_history') || '[]');
    history.unshift(vehicleData);
    if (history.length > 100) {
      history = history.slice(0, 100); // Garder seulement 100 entrées
    }
    localStorage.setItem('search_history', JSON.stringify(history));
  }

  // Récupérer l'historique
  getHistory() {
    return JSON.parse(localStorage.getItem('search_history') || '[]');
  }

  // Notifications
  showNotification(title, body, type = 'info') {
    const notification = {
      id: Date.now(),
      title,
      body,
      type,
      timestamp: new Date().toISOString()
    };

    this.notifications.unshift(notification);
    
    // Envoyer une notification système
    ipcRenderer.send('show-notification', title, body);
    
    // Créer une notification dans l'UI
    this.createUINotification(notification);
    
    // Supprimer après 5 secondes
    setTimeout(() => {
      this.removeNotification(notification.id);
    }, 5000);
  }

  createUINotification(notification) {
    const container = document.getElementById('notifications-container') || this.createNotificationContainer();
    
    const notifEl = document.createElement('div');
    notifEl.className = `notification ${notification.type} slide-in`;
    notifEl.setAttribute('data-id', notification.id);
    notifEl.innerHTML = `
      <div class="flex justify-between items-start">
        <div>
          <h4 class="font-semibold text-gray-900">${notification.title}</h4>
          <p class="text-sm text-gray-600">${notification.body}</p>
        </div>
        <button onclick="autoCheck.removeNotification(${notification.id})" class="text-gray-400 hover:text-gray-600">
          <span class="sr-only">Fermer</span>
          ×
        </button>
      </div>
    `;
    
    container.appendChild(notifEl);
  }

  createNotificationContainer() {
    const container = document.createElement('div');
    container.id = 'notifications-container';
    container.className = 'fixed top-4 right-4 z-50 space-y-2';
    document.body.appendChild(container);
    return container;
  }

  removeNotification(id) {
    const notifEl = document.querySelector(`[data-id="${id}"]`);
    if (notifEl) {
      notifEl.remove();
    }
    this.notifications = this.notifications.filter(n => n.id !== id);
  }

  // Statistiques
  getStats() {
    const history = this.getHistory();
    const today = new Date().toDateString();
    const todaySearches = history.filter(h => new Date(h.searchTimestamp).toDateString() === today);
    const stolenFound = history.filter(h => h.status === 'stolen');
    
    return {
      totalSearches: history.length,
      todaySearches: todaySearches.length,
      stolenFound: stolenFound.length,
      lastSearch: history[0] ? new Date(history[0].searchTimestamp).toLocaleString() : 'Aucune'
    };
  }

  // Mode hors ligne
  toggleOfflineMode() {
    this.isOfflineMode = !this.isOfflineMode;
    localStorage.setItem('offline_mode', this.isOfflineMode ? 'true' : 'false');
    this.showNotification(
      'Mode ' + (this.isOfflineMode ? 'hors ligne' : 'en ligne'),
      'Application basculée en mode ' + (this.isOfflineMode ? 'hors ligne' : 'en ligne'),
      'info'
    );
  }

  // Gestion des signalements
  reportStolenVehicle(vehicleInfo) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const report = {
          ...vehicleInfo,
          id: Date.now(),
          reportedBy: this.getCurrentUser(),
          reportDate: new Date().toISOString(),
          status: 'active'
        };
        
        let stolenVehicles = JSON.parse(localStorage.getItem('stolen_reports') || '[]');
        stolenVehicles.unshift(report);
        localStorage.setItem('stolen_reports', JSON.stringify(stolenVehicles));
        
        this.showNotification('Signalement Enregistré', `Véhicule ${vehicleInfo.licensePlate} signalé volé`, 'success');
        resolve(report);
      }, 1000);
    });
  }

  // Formater la date
  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}

// Instance globale
const autoCheck = new AutoCheckApp();

// Fonctions utilitaires globales
function showLoading(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerHTML = '<div class="loading-spinner mx-auto"></div><p class="mt-2 text-center text-gray-600">Chargement...</p>';
  }
}

function hideLoading(elementId, originalContent) {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerHTML = originalContent;
  }
}

// Fonction pour masquer la barre de défilement Windows dans Electron
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AutoCheckApp, autoCheck };
}