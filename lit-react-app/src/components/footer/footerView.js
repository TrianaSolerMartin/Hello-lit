import { LitElement, html, css } from 'lit';

class FooterView extends LitElement {
  static styles = css`
    :host {
      display: block;
      background: var(--bg-color);
      padding: 2rem 0;
      margin-top: 2rem;
      border-top: 1px solid rgba(0,0,0,0.1);
    }
    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
      padding: 0 1rem;
    }
    .footer-section h3 {
      color: var(--primary-color);
      margin-bottom: 1rem;
    }
    .footer-links {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .footer-links li {
      margin-bottom: 0.5rem;
    }
    .footer-links a {
      color: var(--text-color);
      text-decoration: none;
      opacity: 0.8;
      transition: opacity 0.3s;
    }
    .footer-links a:hover {
      opacity: 1;
    }
    .social-links {
      display: flex;
      gap: 1rem;
    }
    .social-links a {
      font-size: 1.5rem;
      color: var(--primary-color);
      text-decoration: none;
    }
    .copyright {
      grid-column: 1/-1;
      text-align: center;
      margin-top: 2rem;
      opacity: 0.8;
    }
  `;

  render() {
    return html`
      <div class="footer-container">
        <div class="footer-section">
          <h3>About Us</h3>
          <ul class="footer-links">
            <li><a href="#">Company</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h3>Support</h3>
          <ul class="footer-links">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h3>Connect</h3>
          <div class="social-links">
            <a href="#" title="Twitter">🐦</a>
            <a href="#" title="Facebook">👥</a>
            <a href="#" title="LinkedIn">💼</a>
          </div>
        </div>

        <div class="copyright">
          © ${new Date().getFullYear()} BankApp. All rights reserved.
        </div>
      </div>
    `;
  }
}

customElements.define('footer-view', FooterView);