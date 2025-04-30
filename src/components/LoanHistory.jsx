export const LoanHistory = ({ loanList }) => {
  // const numberOfEmiLeft = (loan) => {
  //   if (!loan.emiDuration || !loan.emisPaid) return "N/A";
  //   return loan.emiDuration - loan.emisPaid;
  // };
// const handlePayment = (loanId, emiAmount) => {


// }
  
  return (
    <>
      <div className="loan-history-header">
        <h2 className="fs-1 my3">Loan History</h2>
        <table className="table">
          <thead>
            <tr className="table-header fs-5 text-center ">
              <th>LoanId</th>
              <th>Type</th>
              <th>Loan Amount</th>
              <th>Loan Description</th>
              <th>
                Duration
                <sub>in months</sub>
              </th>
              <th>Rate</th>
              <th>Total Amount</th>
              <th>EMi Amount</th>
              <th>Date</th>
              {/* <th>pay Emi</th> */}
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
                    <td>{loan.loanId}</td>
                    <td>{loan.type}</td>
                    <td>{loan.amount}</td>
                    <td>{loan.description || " N / A"}</td>
                    <td>{loan.emiDuration || " N / A"}</td>
                    <td>{loan.emiRate || "N / A"}</td>
                    <td>{loan.totalAmount || " N / A"}</td>
                    <td>{loan.emiperMonth || "N/A"}</td>
                    <td>{loan.date || " N / A"}</td>
                    {/* <td><button onClick={()=>handlePayment(loan.loanId, loan.emiperMonth)} >Pay</button></td> */}
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
