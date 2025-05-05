import { useReducer,} from "react";
import{v4 as uuidv4} from "uuid";
import LoanReducer from "../reducers/LoanReducer.jsx"

const initialState ={
 loanAmount: 0,
 loanDescription : "",
 emiRate : 0, 
 emiDuration : 0,
 loanType: "credit"

}

const Loan = ({ handleLoan }) => {
  const [state , dispatch] = useReducer(LoanReducer , initialState);
  const updateLoan = (e) => {
    e.preventDefault();
    if (state.loanAmount < 0 ) {
      return alert("Amount should be greater than 0");
    }

    if(state.loanType==="loan"){
 
  if(state.emiRate<=0){
    return alert("Emi or Intrest Rate can't be less than 0")
  }
  if(state.emiDuration<=0){
    return alert("Emi duration can't be less than 0")
  }
}
    {
      const loanId = uuidv4().slice(0,4);
      const loanDetails = {
        loanId: loanId,
        type: state.loanType,
        amount: Number(state.loanAmount),
        description: state.loanDescription,
        emiRate: Number(state.emiRate),
        emiDuration: Number(state.emiDuration),
        date: new Date().toLocaleDateString(),
      };

      handleLoan(loanDetails);
      dispatch({type:"Reset"})
     
    }
  };
  return (
    <>
      <form className="Loan-form">
        <label htmlFor="amountType">Amount Type</label>
        <select
          className="input-field"
          value={state.loanType}
          onChange={(e) => dispatch({type: "type", payload: e.target.value})}
        >
          <option value="credit">Credit</option>
          <option value="loan">Loan</option>
        </select>
        <label htmlFor="loanamount">Amount</label>
        <input
          type="number"
          placeholder="Enter the Amount"
          className="input-field"
          value={state.loanAmount}
          onChange={(e) => dispatch({type: "loanAmount", payload: e.target.value})}
        />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          placeholder="Enter Description"
          className="input-field"
          value={state.loanDescription}
          onChange={(e) =>dispatch({type:"description", payload:e.target.value})}
        />
        {state.loanType === "loan" && (
          <>
            <label htmlFor="EmiRate">EmiRate</label>
            <input
              type="number"
              placeholder="Enter the EmiRate(in %)"
              className="input-field"
              value={state.emiRate}
              onChange={(e) =>dispatch({type:"emiRate", payload:e.target.value})}
            />
            <label htmlFor="EmiDuration">Emi Duration</label>
            <input
              type="number"
              placeholder="Enter the Emi-Duration(in months)"
              className="input-field"
              value={state.emiDuration}
              onChange={(e) =>dispatch({type:"emiDuration", payload:e.target.value})}
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
