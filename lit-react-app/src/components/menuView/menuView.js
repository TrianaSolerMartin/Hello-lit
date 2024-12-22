import { LitElement, html, css } from 'lit';

class MenuView extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .menu-container {
      background: var(--bg-color);
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .user-section {
      padding: 1rem;
      border-bottom: 1px solid #eee;
      margin-bottom: 1rem;
    }
    .menu-items {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .menu-item {
      padding: 0.8rem;
      cursor: pointer;
      border-radius: 4px;
      transition: background 0.3s;
    }
    .menu-item:hover {
      background: rgba(0,0,0,0.05);
    }
    .menu-item.active {
      background: var(--primary-color);
      color: white;
    }
    .icon {
      margin-right: 0.5rem;
    }
    @media (max-width: 768px) {
      .menu-container {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        width: 250px;
        transform: translateX(-100%);
        transition: transform 0.3s;
        z-index: 1000;
      }
      .menu-container.open {
        transform: translateX(0);
      }
    }
  `;

  static properties = {
    isOpen: { type: Boolean },
    activeItem: { type: String },
    userInfo: { type: Object }
  };

  constructor() {
    super();
    this.isOpen = false;
    this.activeItem = 'dashboard';
    this.userInfo = {
      name: 'John Doe',
      email: 'john@example.com'
    };
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  handleNavigation(route) {
    this.activeItem = route;
    this.dispatchEvent(new CustomEvent('navigate', { 
      detail: route 
    }));
    if (window.innerWidth <= 768) {
      this.isOpen = false;
    }
  }

  render() {
    return html`
      <div class="menu-container ${this.isOpen ? 'open' : ''}">
        <div class="user-section">
          <h3>${this.userInfo.name}</h3>
          <p>${this.userInfo.email}</p>
        </div>
        
        <ul class="menu-items">
          <li class="menu-item ${this.activeItem === 'dashboard' ? 'active' : ''}"
              @click=${() => this.handleNavigation('dashboard')}>
            <span class="icon">📊</span> Dashboard
          </li>
          <li class="menu-item ${this.activeItem === 'transactions' ? 'active' : ''}"
              @click=${() => this.handleNavigation('transactions')}>
            <span class="icon">💰</span> Transactions
          </li>
          <li class="menu-item ${this.activeItem === 'profile' ? 'active' : ''}"
              @click=${() => this.handleNavigation('profile')}>
            <span class="icon">👤</span> Profile
          </li>
          <li class="menu-item ${this.activeItem === 'settings' ? 'active' : ''}"
              @click=${() => this.handleNavigation('settings')}>
            <span class="icon">⚙️</span> Settings
          </li>
        </ul>
      </div>
    `;
  }
}

customElements.define('menu-view', MenuView);