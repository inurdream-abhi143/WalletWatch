import { useState } from "react";
import{v4 as uuidv4} from "uuid";
const Loan = ({ handleLoan }) => {
  const [loanAmount, setLoanAmount] = useState(0);
  const [loanDescription, setLoanDescription] = useState("");
  const [emiRate, setEmiRate] = useState(0);
  const [emiDuration, setEmiDuration] = useState(0);
  const [loanType, setLoanType] = useState("credit");

  const updateLoan = (e) => {
    e.preventDefault();
    if (loanAmount < 0) {
      return alert("Amount should be greater than 0");
    }

    {
      const loanId = uuidv4().slice(0,4);
      const loanDetails = {
        loanId: loanId,
        type: loanType,
        amount: Number(loanAmount),
        description: loanDescription,
        emiRate: Number(emiRate),
        emiDuration: Number(emiDuration),
        date: new Date().toLocaleDateString(),
      };
      handleLoan(loanDetails);
      setLoanAmount(0);
      setLoanDescription("");
      setEmiRate(0);
      setEmiDuration(0);
      setLoanType("credit");
    }
  };
  return (
    <>
      <form className="Loan-form">
        <label htmlFor="amountType">Amount Type</label>
        <select
          className="input-field"
          value={loanType}
          onChange={(e) => setLoanType(e.target.value)}
        >
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
          <option value="loan">Loan</option>
        </select>
        <label htmlFor="loanamount">Amount</label>
        <input
          type="number"
          placeholder="Enter the Amount"
          className="input-field"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
        />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          placeholder="Enter Description"
          className="input-field"
          value={loanDescription}
          onChange={(e) => setLoanDescription(e.target.value)}
        />
        {loanType === "loan" && (
          <>
            <label htmlFor="EmiRate">EmiRate</label>
            <input
              type="number"
              placeholder="Enter the EmiRate(in %)"
              className="input-field"
              value={emiRate}
              onChange={(e) => setEmiRate(e.target.value)}
            />
            <label htmlFor="EmiDuration">Emi Duration</label>
            <input
              type="number"
              placeholder="Enter the Emi-Duration(in months)"
              className="input-field"
              value={emiDuration}
              onChange={(e) => setEmiDuration(e.target.value)}
            />
          </>
        )}

        <button className="Loanbtn" onClick={updateLoan}>
          Add
        </button>
      </form>
    </>
  );
};
export default Loan;
