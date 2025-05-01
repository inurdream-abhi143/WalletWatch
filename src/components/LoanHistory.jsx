export const LoanHistory = ({ loanList, setLoanList, balance, setBalance }) => {
  const loanRemain = loanList.find((loan) => loan.loanDue > 0);
  console.log(loanRemain);

  const handlePayment = (loanId, amountToPay) => {
    const updatedLoanList = loanList.map((loan) => {
      if (loan.loanId === loanId) {
        // Handle Credit loan (one-time payment)
        if (loan.type === "credit") {
          if (balance < loan.loanDue || balance === 0) {
            alert("Insufficient balance to pay loan");
            return loan;
          } else {
            const updatedBalance = balance - amountToPay;
            setBalance(updatedBalance);
            localStorage.setItem("balance", updatedBalance);
            return {
              ...loan,
              loanDue: 0, // Credit loans are fully paid at once
            };
          }
        }

        // Handle EMI loan (monthly payment)
        if (loan.type === "loan") {
          if (!loan.emiperMonth || balance < loan.emiperMonth || balance === 0) {
            alert("Insufficient balance to pay EMI");
            return loan;
          } else {
            const updatedLoanDue = loan.loanDue - amountToPay;
            const updatedEmisPaid = (loan.emisPaid || 0) + 1;
            const updatedBalance = balance - amountToPay;
            setBalance(updatedBalance);
            return {
              ...loan,
              loanDue: updatedLoanDue > 0 ? updatedLoanDue : 0,
              emisPaid: updatedEmisPaid,
            };
          }
        }
      }
      return loan;
    });

    setLoanList(updatedLoanList);
    localStorage.setItem("loanList", JSON.stringify(updatedLoanList));
  };

  const numberOfEmiLeft = (loan) => {
    if (loan.type !== "loan") return 0; // Credit loans have no EMIs
    const emiDuration = loan.emiDuration || 0;
    const emisPaid = loan.emisPaid || 0;
    return emiDuration - emisPaid > 0 ? emiDuration - emisPaid : 0;
  };

  return (
    <div className="loan-history-header">
      <h2 className="fs-1 my3">Loan History</h2>
      <table className="table">
        <thead>
          <tr className="table-header fs-5 text-center">
            <th>LoanId</th>
            <th>Type</th>
            <th>Loan Amount</th>
            <th>Loan Description</th>
            <th>Duration (months)</th>
            <th>Rate</th>
            <th>Total Amount</th>
            <th>Loan Due</th>
            <th>EMI Amount</th>
            <th>Date</th>
            <th>EMIs Left</th>
            <th>Pay</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {loanList.length === 0 ? (
            <tr>
              <td colSpan="13" className="fs-2">
                No loans has been addes yet
              </td>
            </tr>
          ) : (
            loanList.map((loan) => (
              <tr key={loan.loanId} className="table-body fs-4 text-center">
                <td>{loan.loanId}</td>
                <td>{loan.type}</td>
                <td>{loan.amount}</td>
                <td>{loan.description || "N/A"}</td>
                <td>{loan.emiDuration || "N/A"}</td>
                <td>{loan.emiRate || "N/A"}</td>
                <td>{loan.totalAmount || "N/A"}</td>
                <td>{loan.loanDue}</td>
                <td>{loan.emiperMonth || "N/A"}</td>
                <td>{loan.date || "N/A"}</td>
                <td>{numberOfEmiLeft(loan)}</td>
                <td>
                  {loan.type === "credit" ? (
                    <button
                      disabled={loan.loanDue <= 0}
                      onClick={() => handlePayment(loan.loanId, loan.loanDue)}
                    >
                      Pay Full
                    </button>
                  ) : (
                    <button
                      disabled={
                        loan.loanDue <= 0 ||
                        numberOfEmiLeft(loan) <= 0 ||
                        !loan.emiperMonth
                      }
                      onClick={() => handlePayment(loan.loanId, loan.emiperMonth)}
                    >
                      Pay EMI
                    </button>
                  )}
                </td>
                <td>
                  {loan.loanDue > 0 ? (
                    <span className="badge bg-success">Active</span>
                  ) : (
                    <span className="badge bg-danger">Closed</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="13" className="text-end mx-2 fs-3 py-2">
              Available Balance: <span className="text-success">${balance}</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};