import { LitElement, html, css } from 'lit';

class NavView extends LitElement {
  static styles = css`
    nav {
      background: #2c3e50;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1rem;
    }
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      gap: 2rem;
    }
    a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background 0.3s;
    }
    a:hover, a.active {
      background: #34495e;
    }
  `;

  static properties = {
    currentPage: { type: String }
  };

  render() {
    return html`
      <nav>
        <ul>
          <li>
            <a href="#" 
               class=${this.currentPage === 'dashboard' ? 'active' : ''}
               @click=${() => this.dispatchEvent(new CustomEvent('navigate', {detail: 'dashboard'}))}>
               Dashboard
            </a>
          </li>
          <li>
            <a href="#" 
               class=${this.currentPage === 'profile' ? 'active' : ''}
               @click=${() => this.dispatchEvent(new CustomEvent('navigate', {detail: 'profile'}))}>
               Profile
            </a>
          </li>
          <li>
            <a href="#" 
               class=${this.currentPage === 'transactions' ? 'active' : ''}
               @click=${() => this.dispatchEvent(new CustomEvent('navigate', {detail: 'transactions'}))}>
               Transactions
            </a>
          </li>
        </ul>
      </nav>
    `;
  }
}

customElements.define('nav-view', NavView);