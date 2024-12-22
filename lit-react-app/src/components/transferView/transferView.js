import { LitElement, html, css } from 'lit';

class ActivityLog extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .activity-container {
      background: var(--bg-color);
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .filters {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .activity-group {
      margin-bottom: 1.5rem;
    }
    .date-header {
      font-weight: bold;
      color: var(--primary-color);
      margin: 1rem 0;
    }
    .activity-item {
      display: flex;
      justify-content: space-between;
      padding: 0.8rem;
      border-bottom: 1px solid #eee;
    }
    .activity-type {
      padding: 0.3rem 0.6rem;
      border-radius: 12px;
      font-size: 0.8rem;
    }
    .type-login { background: #e3f2fd; color: #1976d2; }
    .type-transaction { background: #e8f5e9; color: #388e3c; }
    .type-profile { background: #fff3e0; color: #f57c00; }
  `;

  static properties = {
    activities: { type: Array },
    filteredActivities: { type: Array },
    selectedType: { type: String }
  };

  constructor() {
    super();
    this.activities = [];
    this.filteredActivities = [];
    this.selectedType = 'all';
  }

  firstUpdated() {
    this.loadActivities();
  }

  async loadActivities() {
    // Simulate API call
    this.activities = [
      { id: 1, date: '2024-03-20', type: 'login', action: 'Login', details: 'Web browser' },
      { id: 2, date: '2024-03-20', type: 'transaction', action: 'New transaction', details: '$500 transfer' },
      { id: 3, date: '2024-03-19', type: 'profile', action: 'Profile update', details: 'Changed email' }
    ];
    this.filterActivities();
  }

  filterActivities() {
    this.filteredActivities = this.selectedType === 'all' 
      ? this.activities 
      : this.activities.filter(a => a.type === this.selectedType);
  }

  groupByDate(activities) {
    return activities.reduce((groups, activity) => {
      const date = activity.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(activity);
      return groups;
    }, {});
  }

  handleTypeChange(e) {
    this.selectedType = e.target.value;
    this.filterActivities();
  }

  render() {
    const groupedActivities = this.groupByDate(this.filteredActivities);

    return html`
      <div class="activity-container">
        <div class="filters">
          <select @change=${this.handleTypeChange}>
            <option value="all">All Activities</option>
            <option value="login">Logins</option>
            <option value="transaction">Transactions</option>
            <option value="profile">Profile Updates</option>
          </select>
        </div>

        ${Object.entries(groupedActivities).map(([date, activities]) => html`
          <div class="activity-group">
            <div class="date-header">${new Date(date).toLocaleDateString()}</div>
            ${activities.map(activity => html`
              <div class="activity-item">
                <div>
                  <span class="activity-type type-${activity.type}">
                    ${activity.type}
                  </span>
                  ${activity.action}
                </div>
                <div>${activity.details}</div>
              </div>
            `)}
          </div>
        `)}
      </div>
    `;
  }
}

customElements.define('activity-log', ActivityLog);