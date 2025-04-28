import { useEffect, useState } from "react";
import Header from "./components/Header";
import AddRemBal from "./components/AddRemBal";
import Loan from "./components/Loan";
import MiniStatement from "./components/MiniStatement";
import "./App.css";

const App = () => {
  const [transactionList, setTransactionList] = useState([]);
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [loan, setLoan] = useState(0);
  const [loanPaid, setLoanPaid] = useState(0);
  const [loanDue, setLoanDue] = useState(0);
  const [emi, setEmi] = useState(0);
  const [showStatement, setShowStatement] = useState(false); // toggle state
  // const [date, setDate] = useState(""); //Not Needed for adding the date


  useEffect(() => {
    // Load transactionList from localStorage when the app starts
    const storedTransactionList = localStorage.getItem("transactionList");
    if (storedTransactionList) {
      const parsedList = JSON.parse(storedTransactionList);
      setTransactionList(parsedList);

      // Recalculate balance, income, and expense from the loaded transactions
      let tempBalance = 0;
      let tempIncome = 0;
      let tempExpense = 0;
      parsedList.forEach((transaction) => {
        if (transaction.type === "Income") {
          tempBalance += transaction.amount;
          tempIncome += transaction.amount;
        } else if (transaction.type === "Expense") {
          tempBalance -= transaction.amount;
          tempExpense += transaction.amount;
        }
      });
      setBalance(tempBalance);
      setIncome(tempIncome);
      setExpense(tempExpense);
    }
  }, []);

  const handleTransaction = (transaction) => {
    const updatedList = [...transactionList, transaction];
    setTransactionList(updatedList);

    if (transaction.type === "Income") {
      setBalance((prev) => prev + transaction.amount);
      setIncome((prev) => prev + transaction.amount);
    } else if (transaction.type === "Expense") {
      setBalance((prev) => prev - transaction.amount);
      setExpense((prev) => prev + transaction.amount);
    }

    localStorage.setItem("transactionList", JSON.stringify(updatedList));
  };

  const handleLoan = (loanDetails) => {
    const { type, amount, emiRate, emiDuration } = loanDetails;
    const principal = Number(amount);
    const rate = emiRate / 100 / 12;
    const time = emiDuration;

    if (type === "debit") {
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
        <button
          onClick={() => setShowStatement((prev) => !prev)}
          className="Mbtn"
        >
          {showStatement ? "Back to Dashboard" : "View Mini Statement"}
        </button>
      </div>

      {showStatement ? (
        <MiniStatement transactionList={transactionList} balance={balance} />
      ) : (
        <div className="content-container">
          <AddRemBal handleTransaction={handleTransaction} />
          <Loan handleLoan={handleLoan} />
        </div>
      )}
    </>
  );
};

export default App;
