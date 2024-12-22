import { LitElement, html, css } from 'lit';

class AuthView extends LitElement {
  static styles = css`
    :host {
      display: block;
      max-width: 400px;
      margin: 2rem auto;
    }
    .auth-card {
      background: var(--bg-color);
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .form-group {
      margin-bottom: 1rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
    }
    input {
      width: 100%;
      padding: 0.8rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }
    button {
      width: 100%;
      padding: 1rem;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }
    .toggle-form {
      text-align: center;
      margin-top: 1rem;
    }
    .error {
      color: #f44336;
      margin-top: 0.5rem;
      font-size: 14px;
    }
  `;

  static properties = {
    isLogin: { type: Boolean },
    error: { type: String },
    loading: { type: Boolean }
  };

  constructor() {
    super();
    this.isLogin = true;
    this.error = '';
    this.loading = false;
  }

  async handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    this.loading = true;
    this.error = '';

    try {
      const response = await fetch(`/api/auth/${this.isLogin ? 'login' : 'register'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const result = await response.json();
      this.dispatchEvent(new CustomEvent('auth-success', { 
        detail: result 
      }));
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  }

  render() {
    return html`
      <div class="auth-card">
        <h2>${this.isLogin ? 'Login' : 'Register'}</h2>
        
        <form @submit=${this.handleSubmit}>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required>
          </div>

          ${!this.isLogin ? html`
            <div class="form-group">
              <label for="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" required>
            </div>
          ` : ''}

          ${this.error ? html`
            <div class="error">${this.error}</div>
          ` : ''}

          <button type="submit" ?disabled=${this.loading}>
            ${this.loading ? 'Processing...' : this.isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <div class="toggle-form">
          <a href="#" @click=${() => this.isLogin = !this.isLogin}>
            ${this.isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
          </a>
        </div>
      </div>
    `;
  }
}

customElements.define('auth-view', AuthView);