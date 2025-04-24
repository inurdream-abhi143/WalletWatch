const Header = ({
  balance,
  income,
  expense,
  loan,
  loanPaid,
  loanDue,
  emi,
  transactionList,
}) => {
  const TotalBalance = income - expense + loan + loanPaid;
  balance = TotalBalance;
  const onView = (e) => {
    e.preventDefault();

    if (transactionList.length === 0) {
      return alert("No transaction has made Yet");
    }
    {
      const transactionString = transactionList
        .map(
          (tranx, index) =>
            `${index + 1} ${tranx.type}: ${tranx.amount}-${tranx.description}`
        )
        .join("\n");

      alert(
        `Mini Statement\n\n ${transactionString}\n\n Available Balance: ${TotalBalance}`
      );
    }
  };
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
        <button className="Mbtn" onClick={onView}>
          MiniStatement
        </button>
      </div>
    </>
  );
};

export default Header;
