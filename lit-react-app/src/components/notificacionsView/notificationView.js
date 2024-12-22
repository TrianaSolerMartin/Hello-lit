import { LitElement, html, css } from 'lit';

class NotificationsView extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .notifications-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
    }
    .notification {
      background: var(--bg-color);
      padding: 1rem;
      margin-bottom: 0.5rem;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      animation: slideIn 0.3s ease-out;
      max-width: 300px;
    }
    .notification.success {
      border-left: 4px solid #4CAF50;
    }
    .notification.error {
      border-left: 4px solid #f44336;
    }
    @keyframes slideIn {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }
  `;

  static properties = {
    notifications: { type: Array }
  };

  constructor() {
    super();
    this.notifications = [];
  }

  addNotification(message, type = 'success') {
    const id = Date.now();
    this.notifications = [
      ...this.notifications,
      { id, message, type }
    ];
    setTimeout(() => this.removeNotification(id), 3000);
  }

  removeNotification(id) {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }

  render() {
    return html`
      <div class="notifications-container">
        ${this.notifications.map(notification => html`
          <div class="notification ${notification.type}">
            ${notification.message}
          </div>
        `)}
      </div>
    `;
  }
}

customElements.define('notifications-view', NotificationsView);