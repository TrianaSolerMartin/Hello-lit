export class BankService {
  static #transactions = [
    { id: 1, date: "2024-03-22", amount: -50.00, description: "Groceries", category: "Food", type: "expense" },
    { id: 2, date: "2024-03-21", amount: 2500.00, description: "Salary", category: "Income", type: "income" },
    { id: 3, date: "2024-03-20", amount: -30.00, description: "Restaurant", category: "Food", type: "expense" }
  ];

  static async getTransactions(filters = {}) {
    let filtered = [...this.#transactions];

    if (filters.category) {
      filtered = filtered.filter(t => t.category === filters.category);
    }
    if (filters.type) {
      filtered = filtered.filter(t => t.type === filters.type);
    }
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(t => 
        t.description.toLowerCase().includes(search) ||
        t.category.toLowerCase().includes(search)
      );
    }

    return filtered;
  }

  static getCategories() {
    return ["Food", "Income", "Utilities", "Shopping", "Entertainment"];
  }

  static getTransactionTypes() {
    return ["income", "expense"];
  }
}