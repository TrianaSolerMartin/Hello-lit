import { LitElement, html, css } from 'lit';

class NavView extends LitElement {
  static styles = css`
    :host {
      display: block;
      margin-bottom: 2rem;
    }
    .nav {
      background: #2c3e50;
      padding: 1rem;
      border-radius: 8px;
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
    a:hover {
      background: #34495e;
    }
    .active {
      background: #34495e;
    }
  `;

  static properties = {
    currentPage: { type: String }
  };

  render() {
    return html`
      <nav class="nav">
        <ul>
          <li><a href="#" @click=${() => this.dispatchEvent(new CustomEvent('navigate', { detail: 'dashboard' }))}>Dashboard</a></li>
          <li><a href="#" @click=${() => this.dispatchEvent(new CustomEvent('navigate', { detail: 'profile' }))}>Profile</a></li>
          <li><a href="#" @click=${() => this.dispatchEvent(new CustomEvent('navigate', { detail: 'transactions' }))}>Transactions</a></li>
        </ul>
      </nav>
    `;
  }
}

customElements.define('nav-view', NavView);