import { useEffect, useState } from "react";
import Header from "./components/Header";
import AddRemBal from "./components/AddRemBal";
import Loan from "./components/Loan";
import MiniStatement from "./components/MiniStatement";
import "./App.css";
import { LoanHistory } from "./components/LoanHistory";

const App = () => {
  const [transactionList, setTransactionList] = useState([]);
  const [loanList, setLoanList] = useState([]);
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [loan, setLoan] = useState(0);
  const [loanPaid, setLoanPaid] = useState(0);
  const [loanDue, setLoanDue] = useState(0);
  const [emi, setEmi] = useState(0);
  const [showStatement, setShowStatement] = useState(false); // toggle state
  // const [showLoanHistory, setShowLoanHistory] = useState(false); // toggle state
 
  //For storing data in local storage 

  useEffect(() => {
    // Load transactionList from localStorage
  let storedTransactionList = localStorage.getItem("transactionList");
    let storedLoanList = localStorage.getItem("loanList");
  
    if (storedTransactionList) {
      const parsedTransactions = JSON.parse(storedTransactionList);
      setTransactionList(parsedTransactions);
  
      let tempBalance = 0;
      let tempIncome = 0;
      let tempExpense = 0;
  
      parsedTransactions.forEach((transaction) => {
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
  
    if (storedLoanList) {
      const parsedLoans = JSON.parse(storedLoanList);
      setLoanList(parsedLoans);
  
      //  Recalculate loan-related values too (optional but useful)
      let totalLoan = 0;
      let totalDue = 0;
      let totalPaid = 0;
      let loan_Emi = 0;
  
      parsedLoans.forEach((loan) => {
        if (loan.type === "credit"  ) {
          totalLoan += loan.amount;
          totalDue += loan.totalAmount;
        } else if (loan.type === "debit") {
          totalPaid += loan.amount;
          totalDue -= loan.amount;
        }else if(loan.type === "loan"){
          totalLoan += loan.amount;
          totalDue += loan.totalAmount;
          loan_Emi += loan.emiperMonth;
        }
      });
  
      setLoan(totalLoan);
      setLoanDue(totalDue < 0 ? 0 : totalDue);
      setLoanPaid(totalPaid);
      setEmi(loan_Emi);
    }

    //  storedLoanList = localStorage.removeItem("loanList");
    //  storedTransactionList = localStorage.removeItem("transactionList");
  
  }, []);
  

// logic for handling Transaction and Loan 
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

    let emiToPay = 0;

    let emiAmount = 0;

    const principal = Number(amount);
    const rate = Number(emiRate) / 12 / 100;
    const time = Number(emiDuration);

    if (type === "debit") {
      setLoanPaid((prev) => prev + principal);
      setLoanDue((prev) => {
        const newLoanDue = prev - principal;
        return newLoanDue < 0 ? 0 : newLoanDue;
      });
    } else if (type === "loan") {
      if (rate === 0 || time === 0) {
        return alert("Please Enter Valid Emi Rate and Duration");
      }
      {
        setLoan((prev) => prev + principal);
        const emi = Math.round(
          (principal * rate * Math.pow(1 + rate, time)) /
            (Math.pow(1 + rate, time) - 1)
        );
        emiAmount = parseFloat(emi.toFixed(2));
        setEmi(emiAmount);
        emiToPay = parseFloat((emiAmount * time).toFixed(2));
        setLoanDue((prev) => prev + emiToPay);
      }
    } else if (type === "credit") {
      setLoan((prev) => prev + principal);
      setLoanDue((prev) => prev + principal);
      emiToPay = principal;
    }
    const loanInfo = {
      type: type,
      amount: principal,
      description: loanDetails.description,
      emiDuration: emiDuration,
      emiRate: emiRate,
      totalAmount: emiToPay,
      emiperMonth: emiAmount,
      date: loanDetails.date,
    };
    console.log(loanInfo);
    // setLoanList((prev) => [...prev, loanInfo]);

    const updatedLoanList = [...loanList , loanInfo]
    setLoanList(updatedLoanList);


    localStorage.setItem("loanList", JSON.stringify(updatedLoanList));
    
 

  
  };
  useEffect(() => {
    const calculatedBalance = income - expense + loan - loanPaid;
    setBalance(parseFloat(calculatedBalance.toFixed(2)));
  }, [income, expense, loan, loanPaid]);

 

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

      <LoanHistory loanList={loanList} />
    </>
  );
};

export default App;
