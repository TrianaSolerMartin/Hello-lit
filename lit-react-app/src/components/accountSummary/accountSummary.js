import { LitElement, html, css } from 'lit';

class AccountSummary extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .account-card {
      background: var(--bg-color);
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .balance-section {
      text-align: center;
      padding: 1rem 0;
      border-bottom: 1px solid #eee;
    }
    .balance {
      font-size: 2rem;
      font-weight: bold;
      color: var(--primary-color);
    }
    .quick-actions {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 1rem;
      margin: 1rem 0;
    }
    .action-button {
      padding: 0.8rem;
      border: none;
      border-radius: 4px;
      background: var(--secondary-color);
      color: white;
      cursor: pointer;
    }
    .alerts {
      margin-top: 1rem;
      padding: 1rem;
      background: #fff3e0;
      border-radius: 4px;
      border-left: 4px solid #f57c00;
    }
  `;

  static properties = {
    account: { type: Object },
    alerts: { type: Array }
  };

  constructor() {
    super();
    this.account = {
      balance: 5000.00,
      accountNumber: '**** 1234',
      type: 'Checking',
      status: 'Active'
    };
    this.alerts = [
      { type: 'warning', message: 'Low balance alert threshold reached' }
    ];
  }

  handleAction(action) {
    this.dispatchEvent(new CustomEvent('account-action', {
      detail: { action }
    }));
  }

  render() {
    return html`
      <div class="account-card">
        <div class="balance-section">
          <h3>${this.account.type} Account</h3>
          <div class="balance">$${this.account.balance.toFixed(2)}</div>
          <div>Account: ${this.account.accountNumber}</div>
          <div>Status: ${this.account.status}</div>
        </div>

        <div class="quick-actions">
          <button class="action-button" @click=${() => this.handleAction('transfer')}>
            Transfer
          </button>
          <button class="action-button" @click=${() => this.handleAction('payment')}>
            Pay Bill
          </button>
          <button class="action-button" @click=${() => this.handleAction('statement')}>
            Statement
          </button>
        </div>

        ${this.alerts.length > 0 ? html`
          <div class="alerts">
            ${this.alerts.map(alert => html`
              <div class="alert-item">
                ${alert.message}
              </div>
            `)}
          </div>
        ` : ''}
      </div>
    `;
  }
}

customElements.define('account-summary', AccountSummary);