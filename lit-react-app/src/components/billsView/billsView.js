import { LitElement, html, css } from 'lit';

class BillsView extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .bills-container {
      background: var(--bg-color);
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .bill-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid #eee;
    }
    .status-badge {
      padding: 0.3rem 0.6rem;
      border-radius: 12px;
      font-size: 0.8rem;
    }
    .status-paid { background: #e8f5e9; color: #388e3c; }
    .status-pending { background: #fff3e0; color: #f57c00; }
    .status-overdue { background: #ffebee; color: #d32f2f; }
    .actions button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `;

  static properties = {
    bills: { type: Array },
    selectedMonth: { type: String }
  };

  constructor() {
    super();
    this.bills = [
      { 
        id: 1, 
        name: 'Electricity',
        amount: 120.50,
        dueDate: '2024-03-25',
        status: 'pending',
        recurring: true
      },
      {
        id: 2,
        name: 'Internet',
        amount: 75.00,
        dueDate: '2024-03-28',
        status: 'paid',
        recurring: true
      }
    ];
    this.selectedMonth = new Date().toISOString().slice(0, 7);
  }

  handlePayBill(billId) {
    this.dispatchEvent(new CustomEvent('pay-bill', { 
      detail: { billId } 
    }));
  }

  render() {
    return html`
      <div class="bills-container">
        <h2>Bills Management</h2>
        
        <div class="month-selector">
          <input type="month" 
                 .value=${this.selectedMonth}
                 @change=${e => this.selectedMonth = e.target.value}>
        </div>

        ${this.bills.map(bill => html`
          <div class="bill-item">
            <div>
              <strong>${bill.name}</strong>
              <div>Due: ${new Date(bill.dueDate).toLocaleDateString()}</div>
              ${bill.recurring ? html`<small>Recurring</small>` : ''}
            </div>
            <div>$${bill.amount.toFixed(2)}</div>
            <div class="status-badge status-${bill.status}">
              ${bill.status}
            </div>
            <div class="actions">
              ${bill.status === 'pending' ? html`
                <button @click=${() => this.handlePayBill(bill.id)}>
                  Pay Now
                </button>
              ` : ''}
            </div>
          </div>
        `)}
      </div>
    `;
  }
}

customElements.define('bills-view', BillsView);