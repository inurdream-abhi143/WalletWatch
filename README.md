# 💼 WalleWatch

**WalleWatch** is a lightweight personal finance manager built using **React** that helps you keep track of your 💰 income, 💸 expenses, and 🏦 loans — including EMI breakdown and loan history.

---

## 📌 Features

- ✅ Add Income and Expenses with descriptions  
- 📈 Real-time balance updates  
- 🏦 Loan management with **EMI calculation**  
- 💳 View Loan History (Credit, Loan & Debit payments)  
- 📃 Mini-statement for all transactions  
- 💾 Data persists using **LocalStorage**  
- 🔄 State management using `useState`, `useReducer`, and `useEffect`

---

## 🛠️ Tech Stack

| Tech         | Usage                     |
|--------------|---------------------------|
| React        | Frontend library          |
| useReducer   | Form state handling       |
| LocalStorage | Persistent data storage   |
| CSS          | Basic styling             |
| uuid         | Unique loan ID generator  |

---

## 🧠 State Management Breakdown

- `useState` for:
  - Income, Expense, Balance
  - Loan, Loan Due, Loan Paid, EMI
  - Transactions and Loans List
- `useReducer` for:
  - Transaction form (Add/Remove Balance)
  - Loan form input states

---

## 🧾 How It Works

1. **Add/Remove Balance:**  
   Users can add income or expenses with an amount and description. Balance updates accordingly.

2. **Take a Loan:**
   - Enter principal, interest rate, and duration.
   - EMI is calculated using the standard formula.
   - Loan details are saved and displayed in the Loan History.

3. **Repay Loan:**
   - Loan repayments are treated as **"debit"** transactions.
   - Loan Due and Loan Paid amounts are updated.

4. **Mini Statement:**
   - Shows a clean list of all transactions with types, dates, and descriptions.

---

## 📂 Project Structure

```
WalleWatch/
│
├── components/
│   ├── AddRemBal.jsx
│   ├── Header.jsx
│   ├── Loan.jsx
│   ├── MiniStatement.jsx
│   └── LoanHistory.jsx
│
├── reducers/
│   ├── TransactionFunction.jsx
│   └── LoanReducer.jsx
│
├── App.jsx
├── App.css
└── index.js
```

---

## 🧮 EMI Formula Used

> EMI = (P × r × (1 + r)^n) / ((1 + r)^n – 1)

Where:
- `P` = Principal Amount  
- `r` = Monthly Interest Rate  
- `n` = Duration in Months

---

## 🗃️ Data Persistence

All transactions and loans are stored in **localStorage**, so your data doesn't vanish when you reload like your motivation on a Monday 😪.

---

## 🧪 Future Enhancements (Ideas 💡)

- 🔒 Firebase Authentication
- 📊 Charts (Pie/Bar for income-expense & loan breakdown)
- 🌐 Deploy to Vercel/Netlify
- 🌙 Light/Dark Mode toggle
- 📱 Mobile-first responsive UI
- 🧪 Unit testing with Jest + React Testing Library

---

## 🙌 Acknowledgements

Inspired by real-life budgeting headaches and YouTube tutorials 😅.  
Special thanks to my MERN stack training journey and React docs!

---

## 🚀 Getting Started (For Devs)

```bash
git clone https://github.com/your-username/wallewatch.git
cd wallewatch
npm install
npm start
```

Make sure you have Node.js installed.

---

## 🧑‍💻 Author

**Abhishek Dhiman**  
MERN Stack Trainee | React Enthusiast | Project: WalleWatch  
_“Track your cash before it ghosts you.”_