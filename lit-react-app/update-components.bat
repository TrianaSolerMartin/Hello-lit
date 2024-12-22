@echo off
setlocal EnableDelayedExpansion

REM Update Bank Service
(
echo export class BankService {
echo   static async getProfile^(^) {
echo     return {
echo       name: "John Doe",
echo       email: "john@example.com",
echo       balance: 5000.00
echo     };
echo   ^}
echo.
echo   static async getTransactions^(^) {
echo     return [
echo       { date: "2024-03-22", amount: -50.00, description: "Groceries" ^},
echo       { date: "2024-03-21", amount: 2500.00, description: "Salary" ^},
echo       { date: "2024-03-20", amount: -30.00, description: "Restaurant" ^},
echo       { date: "2024-03-19", amount: -25.00, description: "Coffee" ^}
echo     ];
echo   ^}
echo ^}
) > src\services\bank-service.js

echo Service updated successfully!
pause