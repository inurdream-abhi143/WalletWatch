import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
const MiniStatement = ({ transactionList, balance }) => {
  const onview = (e) => {
    e.preventDefault();

    if (transactionList.length === 0) {
      return alert("No Transaction has Been Made Yet");
    }
    {
      const transactionString = transactionList
        .map(
          (transaction, index) =>
            `${index + 1}  ${transaction.type}:  ${transaction.amount}   ${
              transaction.description
            }`
        )
        .join("\n");

      alert(
        `Mini Statement\n\n ${transactionString}\n\n Available Balance ${balance}`
      );
    }
  };

  return (
    <>
      <button className="Pbtn" onClick={onview}>
        Print
      </button>
      <div className="table-section">
        <h2>Mini Statement</h2>
        <table className="table">
          <thead>
            <tr>
              <th>SR.No</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactionList.length === 0 ? (
              <tr>
                <td colSpan="5">No Transaction has been made yet</td>
              </tr>
            ) : (
              transactionList.map((tranx, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{tranx.type}</td>
                    <td>{tranx.amount}</td>
                    <td>{tranx.description}</td>
                    <td>{tranx.date}</td>
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

export default MiniStatement;
