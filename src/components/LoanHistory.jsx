export const LoanHistory = ({ loanList }) => {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>SR.No</th>
            <th>Type</th>
            <th>Loan Amount</th>
            <th>Loan Description</th>
            <th>
              Emi Duration
              <sub>/month</sub>
            </th>
            <th>Emi Rate</th>
            <th>Emi Amount</th>
            <th>EMi/Month</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {loanList.length === 0 ? (
            <tr>
              <td colSpan="9">No Loan has been made yet</td>
            </tr>
          ) : (
            loanList.map((loan, index) => {
              return (
                <tr key={index}>
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
    </>
  );
};
