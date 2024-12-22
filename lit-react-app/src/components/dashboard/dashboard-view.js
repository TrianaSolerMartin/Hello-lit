import { LitElement, html, css } from 'lit';
import { Chart } from 'chart.js/auto';

class DashboardView extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .widget {
      background: var(--bg-color);
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .balance {
      font-size: 2rem;
      font-weight: bold;
      color: var(--primary-color);
    }
    .chart-container {
      height: 300px;
      margin-top: 1rem;
    }
    .transactions-list {
      list-style: none;
      padding: 0;
    }
    .transaction-item {
      display: flex;
      justify-content: space-between;
      padding: 0.8rem 0;
      border-bottom: 1px solid #eee;
    }
    .amount.positive { color: #4CAF50; }
    .amount.negative { color: #f44336; }
  `;

  static properties = {
    accountData: { type: Object },
    recentTransactions: { type: Array }
  };

  constructor() {
    super();
    this.accountData = {
      balance: 5000.00,
      income: 3500.00,
      expenses: 2000.00
    };
    this.recentTransactions = [];
  }

  firstUpdated() {
    this.loadData();
    this.renderCharts();
  }

  async loadData() {
    try {
      const response = await fetch('/api/dashboard');
      const data = await response.json();
      this.accountData = data.account;
      this.recentTransactions = data.transactions;
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  }

  renderCharts() {
    const ctx = this.renderRoot.querySelector('#spendingChart').getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Income', 'Expenses'],
        datasets: [{
          data: [this.accountData.income, this.accountData.expenses],
          backgroundColor: ['#4CAF50', '#f44336']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  render() {
    return html`
      <div class="dashboard-grid">
        <div class="widget">
          <h3>Account Balance</h3>
          <div class="balance">$${this.accountData.balance.toFixed(2)}</div>
        </div>
        
        <div class="widget">
          <h3>Monthly Overview</h3>
          <div class="chart-container">
            <canvas id="spendingChart"></canvas>
          </div>
        </div>

        <div class="widget">
          <h3>Recent Transactions</h3>
          <ul class="transactions-list">
            ${this.recentTransactions.map(t => html`
              <li class="transaction-item">
                <div>${t.description}</div>
                <div class="amount ${t.amount > 0 ? 'positive' : 'negative'}">
                  ${t.amount > 0 ? '+' : ''}$${Math.abs(t.amount).toFixed(2)}
                </div>
              </li>
            `)}
          </ul>
        </div>
      </div>
    `;
  }
}

customElements.define('dashboard-view', DashboardView);