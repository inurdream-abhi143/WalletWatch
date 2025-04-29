export const LoanHistory = ({ loanList }) => {
  return (
    <>
      <div className="loan-history-header">
        <h2 className="fs-1 my3">Loan History</h2>
        <table className="table">
          <thead>
            <tr className="table-header fs-4 text-center ">
              <th>SR.No</th>
              <th>Type</th>
              <th>Loan Amount</th>
              <th>Loan Description</th>
              <th>
                Emi Duration
                <sub>/month</sub>
              </th>
              <th>Emi Rate</th>
              <th>Total Amount</th>
              <th>EMi/Month</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {loanList.length === 0 ? (
              <tr>
                <td colSpan="9" className="fs-2">
                  No Loan has been made yet
                </td>
              </tr>
            ) : (
              loanList.map((loan, index) => {
                return (
                  <tr key={index} className=" table-body fs-4 text-center">
                    <td>{index + 1}</td>
                    <td>{loan.type}</td>
                    <td>{loan.amount}</td>
                    <td>{loan.description || " N / A"}</td>
                    <td>{loan.emiDuration || " N / A"}</td>
                    <td>{loan.emiRate || "N / A"}</td>
                    <td>{loan.totalAmount || " N / A"}</td>
                    <td>{loan.emiperMonth || "N/A"}</td>
                    <td>{loan.date || " N / A"}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
