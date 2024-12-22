import { LitElement, html, css } from 'lit';
import { BankService } from '../../services/bank-service.js';

class ProfileView extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .profile-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .profile-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #eee;
    }
    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
    }
    .account-info {
      margin-top: 1rem;
    }
    .balance {
      font-size: 1.5rem;
      color: #2c3e50;
      margin: 0.5rem 0;
    }
    .account-number {
      color: #666;
      font-family: monospace;
    }
  `;

  static properties = {
    profile: { type: Object }
  };

  constructor() {
    super();
    this.profile = null;
  }

  async firstUpdated() {
    try {
      this.profile = await BankService.getProfile();
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  }

  render() {
    if (!this.profile) {
      return html`<div>Loading profile...</div>`;
    }

    return html`
      <div class="profile-card">
        <div class="profile-header">
          <img class="avatar" src="${this.profile.avatar || 'https://via.placeholder.com/80'}" alt="Profile">
          <div>
            <h2>${this.profile.name}</h2>
            <p>${this.profile.email}</p>
          </div>
        </div>
        
        <div class="account-info">
          <p class="account-number">Account: ${this.profile.accountNumber}</p>
          <p class="balance">Balance: ${this.profile.currency} ${this.profile.balance.toFixed(2)}</p>
          <p>Account Type: ${this.profile.accountType}</p>
          <p>Last Login: ${new Date(this.profile.lastLogin).toLocaleString()}</p>
        </div>
      </div>
    `;
  }
}

customElements.define('profile-view', ProfileView);