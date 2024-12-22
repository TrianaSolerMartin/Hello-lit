import { LitElement, html, css } from 'lit';
import '../profile/profile-view.js';
import '../transactions/transaction-view.js';
import { BankService } from '../../services/bank-service.js';

class DashboardView extends LitElement {
  static styles = css`
    :host {
      display: block;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    .dashboard-grid {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 20px;
    }
    .summary-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .card {
      background: white;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.2s;
    }
    .card:hover {
      transform: translateY(-2px);
    }
    .error-message {
      color: red;
      padding: 1rem;
      background: #fee;
      border-radius: 4px;
    }
    @media (max-width: 768px) {
      .dashboard-grid {
        grid-template-columns: 1fr;
      }
    }
  `;

  static properties = {
    summary: { type: Object },
    loading: { type: Boolean },
    error: { type: String }
  };

  constructor() {
    super();
    this.summary = null;
    this.loading = true;
    this.error = '';
  }

  async firstUpdated() {
    await this.loadDashboardData();
  }

  async loadDashboardData() {
    try {
      this.loading = true;
      this.error = '';
      this.summary = await BankService.getMonthlySummary();
    } catch (err) {
      this.error = 'Failed to load dashboard data';
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  render() {
    return html`
      <div class="dashboard-grid">
        <aside>
          <profile-view></profile-view>
        </aside>
        <main>
          ${this.error ? html`
            <div class="error-message">${this.error}</div>
          ` : ''}
          
          <div class="summary-cards">
            <div class="card">
              <h3>Monthly Summary</h3>
              ${this.loading ? html`<p>Loading...</p>` : html`
                <p>Income: $${this.summary?.income || 0}</p>
                <p>Expenses: $${this.summary?.expenses || 0}</p>
                <p>Net: $${this.summary?.balance || 0}</p>
              `}
            </div>
            <div class="card">
              <h3>Quick Actions</h3>
              <button @click=${() => this.loadDashboardData()} 
                      ?disabled=${this.loading}>
                ${this.loading ? 'Refreshing...' : 'Refresh Data'}
              </button>
            </div>
          </div>
          <transaction-view></transaction-view>
        </main>
      </div>
    `;
  }
}

customElements.define('dashboard-view', DashboardView);