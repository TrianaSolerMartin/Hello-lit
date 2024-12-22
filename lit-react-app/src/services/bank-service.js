export class BankService {
  static async getProfile() {
    return {
      name: "John Doe",
      email: "john@example.com",
      balance: 5000.00
    };
  }

  static async getTransactions() {
    return [
      { date: "2024-03-22", amount: -50.00, description: "Groceries" },
      { date: "2024-03-21", amount: 2500.00, description: "Salary" },
      { date: "2024-03-20", amount: -30.00, description: "Restaurant" },
      { date: "2024-03-19", amount: -25.00, description: "Coffee" }
    ];
  }
}
