import { LitElement, html, css } from 'lit';
import { Chart } from 'chart.js/auto';
import { BankService } from '../../services/bank-service.js';

class TransactionView extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 1rem;
    }
    .transactions {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .chart-container {
      height: 300px;
    }
  `;

  static properties = {
    transactions: { type: Array }
  };

  async firstUpdated() {
    this.transactions = await BankService.getTransactions();
    this.renderChart();
  }

  renderChart() {
    const ctx = this.renderRoot.querySelector('canvas').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.transactions.map(t => t.date),
        datasets: [{
          label: 'Balance',
          data: this.transactions.map(t => t.amount)
        }]
      }
    });
  }

  render() {
    return html`
      <div class="transactions">
        <h2>Transactions</h2>
        <div class="chart-container">
          <canvas></canvas>
        </div>
        <ul>
          ${this.transactions?.map(t => html`
            <li>${t.date} - ${t.description}: $${t.amount}</li>
          `)}
        </ul>
      </div>
    `;
  }
}

customElements.define('transaction-view', TransactionView);