import { LitElement, html, css } from 'lit';
import { Chart } from 'chart.js/auto';
import { BankService } from '../../services/bank-service.js';

class TransactionView extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .transaction-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .chart-container {
      height: 300px;
      margin-bottom: 1.5rem;
    }
    .filters {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .transaction-list {
      list-style: none;
      padding: 0;
    }
    .transaction-item {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
      border-bottom: 1px solid #eee;
    }
    .transaction-info {
      display: flex;
      flex-direction: column;
    }
    .amount.positive { color: green; }
    .amount.negative { color: red; }
    select, input {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  `;

  static properties = {
    transactions: { type: Array },
    selectedCategory: { type: String },
    dateRange: { type: Object }
  };

  constructor() {
    super();
    this.transactions = [];
    this.selectedCategory = '';
    this.dateRange = { start: '', end: '' };
  }

  async firstUpdated() {
    await this.loadTransactions();
    this.renderChart();
  }

  async loadTransactions() {
    try {
      this.transactions = await BankService.getTransactions({
        category: this.selectedCategory,
        dateFrom: this.dateRange.start,
        dateTo: this.dateRange.end
      });
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  }

  renderChart() {
    const ctx = this.renderRoot.querySelector('canvas').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.transactions.map(t => t.date),
        datasets: [{
          label: 'Transaction Amount',
          data: this.transactions.map(t => t.amount),
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  async handleFilterChange() {
    await this.loadTransactions();
    this.renderChart();
  }

  render() {
    return html`
      <div class="transaction-card">
        <div class="filters">
          <select @change=${e => {
            this.selectedCategory = e.target.value;
            this.handleFilterChange();
          }}>
            <option value="">All Categories</option>
            ${BankService.getCategories().map(cat => html`
              <option value=${cat}>${cat}</option>
            `)}
          </select>
          <input type="date" 
                 .value=${this.dateRange.start}
                 @change=${e => {
                   this.dateRange.start = e.target.value;
                   this.handleFilterChange();
                 }}>
        </div>

        <div class="chart-container">
          <canvas></canvas>
        </div>

        <ul class="transaction-list">
          ${this.transactions.map(t => html`
            <li class="transaction-item">
              <div class="transaction-info">
                <strong>${t.date}</strong>
                <span>${t.description}</span>
                <small>${t.category}</small>
              </div>
              <span class="amount ${t.amount > 0 ? 'positive' : 'negative'}">
                ${t.amount > 0 ? '+' : ''}$${Math.abs(t.amount).toFixed(2)}
              </span>
            </li>
          `)}
        </ul>
      </div>
    `;
  }
}

customElements.define('transaction-view', TransactionView);