import { useState, useEffect } from "react";
import Header from "./components/Header";

import AddRemBal from ".//components/AddRemBal";
// import TransHistory from "./components/TransHistory";
import Loan from "./components/Loan";

import "./App.css";

const App = () => {
  // for mini Statemnet
  const [transactionList, setTransactionList] = useState([]);
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [loan, setLoan] = useState(0);
  const [loanPaid, setLoanPaid] = useState(0);
  const [loanDue, setLoanDue] = useState(0);
  const [emi, setEmi] = useState(0);
  const [emiDuration, setEmiDuration] = useState(0);
  const [emiRate, setEmiRate] = useState(0);

  const handleTransaction = (transaction) => {
    setTransactionList((prev) => [...prev, transaction]);
    if (transaction.type === "Income") {
      setBalance((prev) => prev + transaction.amount);
      setIncome((prev) => prev + transaction.amount);
    } else if (transaction.type === "Expense") {
      setBalance((prev) => prev - transaction.amount);
      setExpense((prev) => prev + transaction.amount);
    }
  };
  const handleLoan = (loanDetails) => {
    const { type, amount, description, emiRate, emiDuration } = loanDetails;
    const principal = Number(amount);
    const rate = emiRate / 100 / 12;
    const time = emiDuration;

    if (type === "debit") {
      // setLoan((prev) => prev - principal);
      setLoanPaid((prev) => prev + principal);

      setLoanDue((prev) => {
        const newLoanDue = prev - principal;
        return newLoanDue < 0 ? 0 : newLoanDue;
      });
    } else if (type === "credit") {
      setLoan((prev) => prev + principal);

      const emi =
        (principal * rate * Math.pow(1 + rate, time)) /
        (Math.pow(1 + rate, time) - 1);
      const emiAmount = parseFloat(emi.toFixed(2));

      setEmi(emiAmount);
      const emiToPay = parseFloat((emiAmount * time).toFixed(2));
      setLoanDue((prev) => prev + emiToPay);
    }
  };
  return (
    <>
      <div className="header-section">
        <Header
          balance={balance}
          income={income}
          expense={expense}
          loan={loan}
          loanPaid={loanPaid}
          loanDue={loanDue}
          emi={emi}
          transactionList={transactionList}
        />
      </div>

      <div className="content-container">
        <AddRemBal handleTransaction={handleTransaction} />
        <Loan handleLoan={handleLoan} />
      </div>
      {/* <div className="transaction-history">
        <TransHistory transactionList={transactionList} />
      </div> */}
    </>
  );
};

export default App;
