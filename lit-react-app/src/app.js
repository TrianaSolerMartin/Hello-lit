import { LitElement, html, css } from 'lit';
import './components/nav/nav-view.js';
import './components/dashboard/dashboard-view.js';
import './components/transactions/transantionHistory.js';
import './components/bugetView/bugetView.js';
import './components/billsView/billsView.js';
import './components/profile/ProfileView.js';
import './components/accountSummary/accountSummary.js';
import './components/settingsView/SettingsView.js';
import './components/activityLog/activityLog.js';

class BankApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      --primary-color: #2c3e50;
      --secondary-color: #34495e;
      --bg-color: var(--theme-bg, #ffffff);
      --text-color: var(--theme-text, #333333);
      background-color: var(--bg-color);
      color: var(--text-color);
      transition: all 0.3s ease;
    }

    .app-container {
      display: grid;
      grid-template-columns: 250px 1fr;
      gap: 2rem;
    }

    .content-area {
      padding: 1rem;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .search-bar {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
      padding: 1rem;
      background: var(--bg-color);
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .search-filters {
      display: grid;
      grid-template-columns: 1fr auto auto auto;
      gap: 1rem;
      align-items: center;
    }

    .theme-toggle {
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 1rem;
      border-radius: 50%;
      background: var(--primary-color);
      color: white;
      border: none;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      z-index: 1000;
      transition: transform 0.3s;
    }

    .theme-toggle:hover {
      transform: scale(1.1);
    }

    input, select {
      padding: 0.8rem;
      border: 1px solid var(--secondary-color);
      border-radius: 4px;
      background: var(--bg-color);
      color: var(--text-color);
    }

    @media (max-width: 768px) {
      .app-container {
        grid-template-columns: 1fr;
      }
      .search-filters {
        grid-template-columns: 1fr;
      }
    }
  `;


  static properties = {
    currentPage: { type: String },
    darkMode: { type: Boolean, reflect: true },
    searchQuery: { type: String },
    dateRange: { type: Object },
    selectedCategory: { type: String },
    searchHistory: { type: Array },
    user: { type: Object },
    filterValues: { type: Object }
  };

  constructor() {
    super();
    this.currentPage = 'dashboard';
    this.darkMode = localStorage.getItem('darkMode') === 'true';
    this.searchQuery = '';
    this.dateRange = { start: '', end: '' };
    this.selectedCategory = '';
    this.searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    this.user = {
      name: 'John Doe',
      email: 'john@example.com'
    };
    this.filterValues = {
      category: '',
      dateFrom: '',
      dateTo: '',
      sortBy: 'date'
    };
    this.updateTheme();
  }

  updateTheme() {
    document.documentElement.style.setProperty(
      '--theme-bg',
      this.darkMode ? '#1a1a1a' : '#ffffff'
    );
    document.documentElement.style.setProperty(
      '--theme-text',
      this.darkMode ? '#ffffff' : '#333333'
    );
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkMode', this.darkMode);
    this.updateTheme();
  }

  saveSearchHistory(query) {
    if (query && !this.searchHistory.includes(query)) {
      this.searchHistory = [query, ...this.searchHistory].slice(0, 5);
      localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
    }
  }

  handleSearch(e) {
    e.preventDefault();
    this.saveSearchHistory(this.searchQuery);
    this.filterValues = {
      ...this.filterValues,
      search: this.searchQuery,
      dateFrom: this.dateRange.start,
      dateTo: this.dateRange.end,
      category: this.selectedCategory
    };
  }

  renderPage() {
    switch(this.currentPage) {
      case 'dashboard':
        return html`
          <div class="dashboard-grid">
            <account-summary></account-summary>
            <budget-view></budget-view>
            <bills-view></bills-view>
          </div>
          <activity-log></activity-log>
          <transaction-history 
            .filterValues=${this.filterValues}>
          </transaction-history>
        `;
      case 'transactions':
        return html`
          <transaction-history 
            .filterValues=${this.filterValues}>
          </transaction-history>
        `;
      case 'budget':
        return html`<budget-view></budget-view>`;
      case 'bills':
        return html`<bills-view></bills-view>`;
      case 'profile':
        return html`<profile-view .user=${this.user}></profile-view>`;
      case 'settings':
        return html`
          <settings-view 
            ?darkMode=${this.darkMode}
            @theme-change=${this.toggleTheme}>
          </settings-view>
        `;
      default:
        return html`<div>Page not found</div>`;
    }
  }

  render() {
    return html`
      <div class="app-container">
        <nav-view 
          .currentPage=${this.currentPage}
          @navigate=${e => this.currentPage = e.detail}
          ?darkMode=${this.darkMode}>
        </nav-view>

        <div class="content-area">
          <form class="search-bar" @submit=${this.handleSearch}>
            <div class="search-filters">
              <input 
                type="search"
                placeholder="Search transactions..."
                .value=${this.searchQuery}
                @input=${e => this.searchQuery = e.target.value}
                list="search-history"
              >
              <datalist id="search-history">
                ${this.searchHistory.map(query => html`
                  <option value=${query}></option>
                `)}
              </datalist>
              <input 
                type="date"
                .value=${this.dateRange.start}
                @change=${e => this.dateRange = { ...this.dateRange, start: e.target.value }}
              >
              <input 
                type="date"
                .value=${this.dateRange.end}
                @change=${e => this.dateRange = { ...this.dateRange, end: e.target.value }}
              >
              <select 
                @change=${e => this.selectedCategory = e.target.value}
                .value=${this.selectedCategory}
              >
                <option value="">All Categories</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
                <option value="transfer">Transfer</option>
              </select>
            </div>
          </form>

          ${this.renderPage()}
        </div>

        <button class="theme-toggle" @click=${this.toggleTheme}>
          ${this.darkMode ? '🌞' : '🌙'}
        </button>
      </div>
    `;
  }
}

customElements.define('bank-app', BankApp);