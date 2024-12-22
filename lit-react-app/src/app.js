import { LitElement, html, css } from 'lit';
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
  `;

  static properties = {
    currentPage: { type: String },
    loading: { type: Boolean }
  };

  constructor() {
    super();
    this.currentPage = 'dashboard';
    this.loading = false;
  }

  handleNavigation(e) {
    this.loading = true;
    this.currentPage = e.detail;
    setTimeout(() => this.loading = false, 300);
  }

  renderPage() {
    switch(this.currentPage) {
      case 'dashboard':
        return html`
          <div class="dashboard">
            <profile-view></profile-view>
            <transaction-view></transaction-view>
          </div>
        `;
      case 'profile':
        return html`<profile-view></profile-view>`;
      case 'transactions':
        return html`<transaction-view></transaction-view>`;
      default:
        return html`<p>Page not found</p>`;
    }
  }

  render() {
    return html`
      <nav-view 
        @navigate=${this.handleNavigation}
        .currentPage=${this.currentPage}>
      </nav-view>
      <div class="page-container ${this.loading ? 'loading' : ''}">
        ${this.renderPage()}
      </div>
    `;
  }
}

customElements.define('bank-app', BankApp);