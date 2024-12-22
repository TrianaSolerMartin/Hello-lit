import { LitElement, html, css } from 'lit';
import { Chart } from 'chart.js/auto';

class ChartsView extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 1rem;
    }
    .charts-container {
      background: var(--bg-color);
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .chart-wrapper {
      height: 300px;
      margin-bottom: 2rem;
    }
    .chart-controls {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    select {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  `;

  static properties = {
    transactions: { type: Array },
    chartType: { type: String }
  };

  constructor() {
    super();
    this.transactions = [];
    this.chartType = 'line';
    this.charts = new Map();
  }

  firstUpdated() {
    this.renderCharts();
  }

  updated(changedProperties) {
    if (changedProperties.has('transactions') || changedProperties.has('chartType')) {
      this.renderCharts();
    }
  }

  renderCharts() {
    this.renderTransactionChart();
    this.renderCategoryChart();
  }

  renderTransactionChart() {
    const ctx = this.renderRoot.querySelector('#transactionChart').getContext('2d');
    const data = {
      labels: this.transactions.map(t => t.date),
      datasets: [{
        label: 'Transaction Amount',
        data: this.transactions.map(t => t.amount),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };

    if (this.charts.has('transaction')) {
      this.charts.get('transaction').destroy();
    }

    this.charts.set('transaction', new Chart(ctx, {
      type: this.chartType,
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }));
  }

  renderCategoryChart() {
    const ctx = this.renderRoot.querySelector('#categoryChart').getContext('2d');
    const categories = {};
    this.transactions.forEach(t => {
      categories[t.category] = (categories[t.category] || 0) + Math.abs(t.amount);
    });

    const data = {
      labels: Object.keys(categories),
      datasets: [{
        data: Object.values(categories),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ]
      }]
    };

    if (this.charts.has('category')) {
      this.charts.get('category').destroy();
    }

    this.charts.set('category', new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }));
  }

  render() {
    return html`
      <div class="charts-container">
        <div class="chart-controls">
          <select @change=${e => this.chartType = e.target.value}>
            <option value="line">Line Chart</option>
            <option value="bar">Bar Chart</option>
          </select>
        </div>

        <div class="chart-wrapper">
          <canvas id="transactionChart"></canvas>
        </div>

        <div class="chart-wrapper">
          <canvas id="categoryChart"></canvas>
        </div>
      </div>
    `;
  }
}

customElements.define('charts-view', ChartsView);