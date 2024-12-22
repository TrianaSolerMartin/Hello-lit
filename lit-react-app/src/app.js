import { LitElement, html, css } from 'lit';
import { Chart } from 'chart.js/auto';
import './components/nav/nav-view.js';
import './components/profile/ProfileView.js';
import './components/transactions/TransactionView.js';

class BankApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    .dashboard {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 20px;
    }
    .page-container {
      opacity: 1;
      transition: opacity 0.3s ease-in-out;
    }
    .page-container.loading {
      opacity: 0.7;
    }
    .search-bar {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
      padding: 1rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .search-bar input {
      flex: 1;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .search-bar button {
      padding: 0.5rem 1rem;
      background: #2c3e50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
    }
    @keyframes slideIn {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }
  `;

  static properties = {
    currentPage: { type: String },
    loading: { type: Boolean },
    searchQuery: { type: String },
    notification: { type: String },
    selectedCategory: { type: String }
  };

  constructor() {
    super();
    this.currentPage = 'dashboard';
    this.loading = false;
    this.searchQuery = '';
    this.notification = '';
    this.selectedCategory = '';
  }

  handleNavigation(e) {
    this.loading = true;
    this.currentPage = e.detail;
    setTimeout(() => this.loading = false, 300);
  }

  showNotification(message) {
    this.notification = message;
    setTimeout(() => this.notification = '', 3000);
  }

  handleSearch(e) {
    e.preventDefault();
    this.showNotification(`Searching for: ${this.searchQuery}`);
    // Implement search logic here
  }

  handleFilterChange(e) {
    const filters = e.detail;
    this.selectedCategory = filters.category;
    this.showNotification(`Filters updated: ${filters.category || 'All'}`);
  }

  renderSearch() {
    return html`
      <form class="search-bar" @submit=${this.handleSearch}>
        <input 
          type="search"
          placeholder="Search transactions..."
          .value=${this.searchQuery}
          @input=${e => this.searchQuery = e.target.value}
        >
        <button type="submit">Search</button>
      </form>
    `;
  }

  renderPage() {
    switch(this.currentPage) {
      case 'dashboard':
        return html`
          <div class="dashboard">
            <profile-view></profile-view>
            <transaction-view 
              .selectedCategory=${this.selectedCategory}
              @filter-change=${this.handleFilterChange}>
            </transaction-view>
          </div>
        `;
      case 'profile':
        return html`<profile-view></profile-view>`;
      case 'transactions':
        return html`
          <transaction-view
            .selectedCategory=${this.selectedCategory}
            @filter-change=${this.handleFilterChange}>
          </transaction-view>
        `;
      default:
        return html`<div>Page not found</div>`;
    }
  }

  render() {
    return html`
      ${this.notification ? html`
        <div class="notification">${this.notification}</div>
      ` : ''}
      
      <nav-view 
        @navigate=${this.handleNavigation}
        .currentPage=${this.currentPage}>
      </nav-view>

      ${this.renderSearch()}
      
      <div class="page-container ${this.loading ? 'loading' : ''}">
        ${this.renderPage()}
      </div>
    `;
  }
}

customElements.define('bank-app', BankApp);