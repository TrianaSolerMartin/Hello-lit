import { LitElement, html, css } from 'lit';

class BudgetView extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .budget-card {
      background: var(--bg-color);
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .category-list {
      display: grid;
      gap: 1rem;
    }
    .category-item {
      padding: 1rem;
      border-radius: 4px;
      background: #f5f5f5;
    }
    .progress-bar {
      height: 8px;
      background: #ddd;
      border-radius: 4px;
      margin: 0.5rem 0;
    }
    .progress-fill {
      height: 100%;
      border-radius: 4px;
      transition: width 0.3s;
    }
    .under-limit { background: #4caf50; }
    .near-limit { background: #ff9800; }
    .over-limit { background: #f44336; }
  `;

  static properties = {
    categories: { type: Array },
    monthlyTotal: { type: Number }
  };

  constructor() {
    super();
    this.categories = [
      { name: 'Food', limit: 500, spent: 350 },
      { name: 'Transport', limit: 200, spent: 180 },
      { name: 'Entertainment', limit: 300, spent: 250 }
    ];
    this.monthlyTotal = 0;
  }

  calculateProgress(spent, limit) {
    const progress = (spent / limit) * 100;
    if (progress >= 100) return 'over-limit';
    if (progress >= 80) return 'near-limit';
    return 'under-limit';
  }

  render() {
    this.monthlyTotal = this.categories.reduce((sum, cat) => sum + cat.spent, 0);

    return html`
      <div class="budget-card">
        <h2>Monthly Budget Overview</h2>
        <p>Total Spent: $${this.monthlyTotal}</p>

        <div class="category-list">
          ${this.categories.map(category => {
            const progress = (category.spent / category.limit) * 100;
            const status = this.calculateProgress(category.spent, category.limit);

            return html`
              <div class="category-item">
                <div style="display: flex; justify-content: space-between">
                  <strong>${category.name}</strong>
                  <span>$${category.spent} / $${category.limit}</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill ${status}"
                       style="width: ${Math.min(progress, 100)}%">
                  </div>
                </div>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }
}

customElements.define('budget-view', BudgetView);