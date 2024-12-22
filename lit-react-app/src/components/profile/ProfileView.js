import { LitElement, html, css } from 'lit';
import { BankService } from '../../services/bank-service.js';

class ProfileView extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 1rem;
    }
    .profile-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  `;

  static properties = {
    profile: { type: Object }
  };

  async firstUpdated() {
    this.profile = await BankService.getProfile();
  }

  render() {
    return html`
      <div class="profile-card">
        <h2>${this.profile?.name}</h2>
        <p>${this.profile?.email}</p>
        <h3>Balance: $${this.profile?.balance}</h3>
      </div>
    `;
  }
}

customElements.define('profile-view', ProfileView);