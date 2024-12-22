import { LitElement, html, css } from 'lit';

class HeaderView extends LitElement {
  static styles = css`
    :host {
      display: block;
      background: var(--bg-color);
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--primary-color);
    }
    .right-section {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
    .profile {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--secondary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
    .notifications {
      position: relative;
      cursor: pointer;
    }
    .notification-badge {
      position: absolute;
      top: -5px;
      right: -5px;
      background: #ff4444;
      color: white;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    @media (max-width: 768px) {
      .profile-info {
        display: none;
      }
    }
  `;

  static properties = {
    user: { type: Object },
    notificationCount: { type: Number }
  };

  constructor() {
    super();
    this.user = {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: '👤'
    };
    this.notificationCount = 3;
  }

  handleProfileClick() {
    this.dispatchEvent(new CustomEvent('profile-click'));
  }

  handleNotificationsClick() {
    this.dispatchEvent(new CustomEvent('notifications-click'));
  }

  render() {
    return html`
      <div class="header-container">
        <div class="logo">
          🏦 BankApp
        </div>
        
        <div class="right-section">
          <div class="notifications" @click=${this.handleNotificationsClick}>
            🔔
            ${this.notificationCount > 0 ? html`
              <span class="notification-badge">${this.notificationCount}</span>
            ` : ''}
          </div>
          
          <div class="profile" @click=${this.handleProfileClick}>
            <div class="avatar">${this.user.avatar}</div>
            <div class="profile-info">
              <div>${this.user.name}</div>
              <div style="font-size: 0.8rem; color: var(--secondary-color)">
                ${this.user.email}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('header-view', HeaderView);