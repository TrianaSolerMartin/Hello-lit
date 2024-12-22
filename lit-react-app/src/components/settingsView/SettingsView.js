import { LitElement, html, css } from 'lit';

class SettingsView extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 1rem;
    }
    .settings-card {
      background: var(--bg-color);
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .setting-group {
      margin-bottom: 1rem;
      padding: 1rem;
      border-bottom: 1px solid #eee;
    }
    button {
      padding: 0.8rem 1.5rem;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `;

  static properties = {
    preferences: { type: Object }
  };

  constructor() {
    super();
    this.preferences = {
      currency: 'USD',
      language: 'en',
      notifications: true,
      autoExport: false
    };
  }

  render() {
    return html`
      <div class="settings-card">
        <h2>Settings</h2>
        
        <div class="setting-group">
          <h3>Appearance</h3>
          <button @click=${() => this.dispatchEvent(new CustomEvent('toggle-theme'))}>
            Toggle Dark Mode
          </button>
        </div>

        <div class="setting-group">
          <h3>Currency</h3>
          <select @change=${e => this.dispatchEvent(new CustomEvent('change-currency', {
            detail: e.target.value
          }))}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>

        <div class="setting-group">
          <h3>Export Data</h3>
          <button @click=${() => this.dispatchEvent(new CustomEvent('export-data'))}>
            Export Transactions
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('settings-view', SettingsView);