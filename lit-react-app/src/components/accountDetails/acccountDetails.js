import { LitElement, html, css } from 'lit';

class AccountDetails extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .details-card {
      background: var(--bg-color);
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .section {
      margin-bottom: 1.5rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid #eee;
    }
    .limits-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }
    .limit-item {
      padding: 1rem;
      background: #f5f5f5;
      border-radius: 4px;
    }
    .linked-account {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.8rem;
      border-bottom: 1px solid #eee;
    }
  `;

  static properties = {
    accountDetails: { type: Object },
    linkedAccounts: { type: Array }
  };

  constructor() {
    super();
    this.accountDetails = {
      type: 'Checking',
      number: '**** 1234',
      opened: '2023-01-15',
      limits: {
        daily: 5000,
        monthly: 50000,
        transfer: 10000
      }
    };
    this.linkedAccounts = [
      { id: 1, type: 'Savings', number: '**** 5678', primary: true },
      { id: 2, type: 'Credit Card', number: '**** 9012', primary: false }
    ];
  }

  handleUnlink(accountId) {
    this.dispatchEvent(new CustomEvent('unlink-account', {
      detail: { accountId }
    }));
  }

  render() {
    return html`
      <div class="details-card">
        <div class="section">
          <h3>Account Information</h3>
          <p><strong>Type:</strong> ${this.accountDetails.type}</p>
          <p><strong>Account Number:</strong> ${this.accountDetails.number}</p>
          <p><strong>Opened:</strong> ${new Date(this.accountDetails.opened).toLocaleDateString()}</p>
        </div>

        <div class="section">
          <h3>Account Limits</h3>
          <div class="limits-grid">
            <div class="limit-item">
              <div>Daily Limit</div>
              <strong>$${this.accountDetails.limits.daily.toLocaleString()}</strong>
            </div>
            <div class="limit-item">
              <div>Monthly Limit</div>
              <strong>$${this.accountDetails.limits.monthly.toLocaleString()}</strong>
            </div>
            <div class="limit-item">
              <div>Transfer Limit</div>
              <strong>$${this.accountDetails.limits.transfer.toLocaleString()}</strong>
            </div>
          </div>
        </div>

        <div class="section">
          <h3>Linked Accounts</h3>
          ${this.linkedAccounts.map(account => html`
            <div class="linked-account">
              <div>
                <div>${account.type} - ${account.number}</div>
                ${account.primary ? html`<small>Primary Link</small>` : ''}
              </div>
              ${!account.primary ? html`
                <button @click=${() => this.handleUnlink(account.id)}>
                  Unlink
                </button>
              ` : ''}
            </div>
          `)}
        </div>
      </div>
    `;
  }
}

customElements.define('account-details', AccountDetails);