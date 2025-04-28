const Header = ({ balance, income, expense, loan, loanPaid, loanDue, emi }) => {
  const TotalBalance = (income - expense + loan - loanPaid).toFixed(2);
  balance = TotalBalance;

  return (
    <>
      <div className="header">
        <p>Hello Abhishek</p>
      </div>
      <div className="Balance-section">
        <p>
          Balance<span className="green">${TotalBalance}</span>
        </p>
        <p>
          Income<span className="green">${income}</span>
        </p>
        <p>
          Expense<span className="red">${expense}</span>
        </p>
        <p>
          Loan<span className="red">${loan}</span>
        </p>
        <p>
          Loan Paid<span className="green">${loanPaid}</span>
        </p>
        <p>
          Loan Due<span className="red">${loanDue}</span>
        </p>
        <p>
          Loan Emi<span className="red">${emi}</span>
        </p>
      </div>
    </>
  );
};

export default Header;
