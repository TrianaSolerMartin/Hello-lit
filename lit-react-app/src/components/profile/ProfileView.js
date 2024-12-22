import { LitElement, html, css } from 'lit';

class ProfileView extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .profile-container {
      max-width: 800px;
      margin: 0 auto;
    }
    .profile-header {
      background: var(--bg-color);
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      text-align: center;
      margin-bottom: 2rem;
    }
    .avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      margin: 0 auto 1rem;
      background: var(--secondary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
      color: white;
    }
    .profile-sections {
      display: grid;
      gap: 2rem;
    }
    .section {
      background: var(--bg-color);
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .section h3 {
      margin-top: 0;
      color: var(--primary-color);
    }
    .edit-button {
      padding: 0.8rem 1.5rem;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .activity-list {
      list-style: none;
      padding: 0;
    }
    .activity-item {
      padding: 1rem 0;
      border-bottom: 1px solid #eee;
    }
  `;

  static properties = {
    user: { type: Object },
    isEditing: { type: Boolean },
    activities: { type: Array }
  };

  constructor() {
    super();
    this.user = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 8900',
      joined: '2024-01-01'
    };
    this.isEditing = false;
    this.activities = [
      { date: '2024-03-20', action: 'Login', details: 'Web browser' },
      { date: '2024-03-19', action: 'Updated profile', details: 'Changed email' }
    ];
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  async handleProfileUpdate(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedData = Object.fromEntries(formData);
    
    try {
      // API call to update profile
      this.user = { ...this.user, ...updatedData };
      this.isEditing = false;
      this.dispatchEvent(new CustomEvent('profile-updated', { 
        detail: this.user 
      }));
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  }

  render() {
    return html`
      <div class="profile-container">
        <div class="profile-header">
          <div class="avatar">👤</div>
          <h2>${this.user.name}</h2>
          <p>Member since ${new Date(this.user.joined).toLocaleDateString()}</p>
        </div>

        <div class="profile-sections">
          <div class="section">
            <h3>Personal Information</h3>
            ${this.isEditing ? html`
              <form @submit=${this.handleProfileUpdate}>
                <div>
                  <label>Name</label>
                  <input name="name" value=${this.user.name}>
                </div>
                <div>
                  <label>Email</label>
                  <input name="email" type="email" value=${this.user.email}>
                </div>
                <div>
                  <label>Phone</label>
                  <input name="phone" value=${this.user.phone}>
                </div>
                <button type="submit">Save Changes</button>
              </form>
            ` : html`
              <div>
                <p><strong>Email:</strong> ${this.user.email}</p>
                <p><strong>Phone:</strong> ${this.user.phone}</p>
                <button class="edit-button" @click=${this.toggleEdit}>
                  Edit Profile
                </button>
              </div>
            `}
          </div>

          <div class="section">
            <h3>Recent Activity</h3>
            <ul class="activity-list">
              ${this.activities.map(activity => html`
                <li class="activity-item">
                  <div><strong>${activity.date}</strong></div>
                  <div>${activity.action} - ${activity.details}</div>
                </li>
              `)}
            </ul>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('profile-view', ProfileView);