import { LitElement, html, css } from 'lit';

class TransactionHistory extends LitElement {
  static styles = css`
    .transaction-container {
      background: var(--bg-color);
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .filters {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .transaction-list {
      border-collapse: collapse;
      width: 100%;
    }
    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #eee;
    }
    .pagination {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-top: 1rem;
    }
    .amount-positive { color: #4CAF50; }
    .amount-negative { color: #f44336; }
  `;

  static properties = {
    transactions: { type: Array },
    currentPage: { type: Number },
    itemsPerPage: { type: Number },
    sortField: { type: String },
    sortDirection: { type: String }
  };

  constructor() {
    super();
    this.transactions = [];
    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.sortField = 'date';
    this.sortDirection = 'desc';
  }

  handleSort(field) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
  }

  get paginatedTransactions() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.transactions.slice(start, end);
  }

  render() {
    return html`
      <div class="transaction-container">
        <div class="filters">
          <select @change=${e => this.itemsPerPage = parseInt(e.target.value)}>
            <option value="10">10 per page</option>
            <option value="25">25 per page</option>
            <option value="50">50 per page</option>
          </select>
          
          <button @click=${() => this.dispatchEvent(new CustomEvent('export'))}>
            Export CSV
          </button>
        </div>

        <table class="transaction-list">
          <thead>
            <tr>
              <th @click=${() => this.handleSort('date')}>Date</th>
              <th @click=${() => this.handleSort('description')}>Description</th>
              <th @click=${() => this.handleSort('amount')}>Amount</th>
              <th @click=${() => this.handleSort('category')}>Category</th>
            </tr>
          </thead>
          <tbody>
            ${this.paginatedTransactions.map(t => html`
              <tr>
                <td>${new Date(t.date).toLocaleDateString()}</td>
                <td>${t.description}</td>
                <td class="amount-${t.amount > 0 ? 'positive' : 'negative'}">
                  ${t.amount > 0 ? '+' : ''}$${Math.abs(t.amount).toFixed(2)}
                </td>
                <td>${t.category}</td>
              </tr>
            `)}
          </tbody>
        </table>

        <div class="pagination">
          <button @click=${() => this.currentPage--} ?disabled=${this.currentPage === 1}>
            Previous
          </button>
          <span>Page ${this.currentPage}</span>
          <button @click=${() => this.currentPage++} 
                  ?disabled=${this.currentPage * this.itemsPerPage >= this.transactions.length}>
            Next
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('transaction-history', TransactionHistory);