// its form where we can add or remove balance
import { useReducer, useState } from "react";
import TransactionFunction from "../reducers/TransactionFunction.jsx";
const AddRemBal = ({ handleTransaction }) => {
  
  const initialState = {
    type :"Income",
    amount :"",
    description :""
  }

  const [state , dispatch] = useReducer(TransactionFunction ,   initialState); 
  const [disable , setDisable] = useState(false)
  // console.log("before change " , disable); //  


  const onAdd = (e) => {
    e.preventDefault();
    if (state.amount <=0 ) {
     
      return alert("Amount should be greater than 0");
    }
     if( state.description ===""){
      return alert("desciption can't be empty ");
     }
    setDisable(true);
     
      const transactionDetails = {
        type: state.type,
        amount: Number(state.amount),
        description: state.description,
        date: new Date().toLocaleDateString(),
      };
      handleTransaction(transactionDetails);
     
      dispatch({type : "Reset"})
    
      setTimeout(() => {
        setDisable(false);
      }, 500);
    
    

  };
  return (
    <>
      <form className="add-rem-bal-form">
        <label htmlFor="type">Type</label>
        <select
          id="type"
          className="input-field"
          value={state.type}
          onChange={(e) => dispatch({type:"type" , payload : e.target.value})}
         
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          placeholder="Enter amount"
          className="input-field"
          value={state.amount}
          onChange={(e) =>dispatch({type:"amount"  , payload : e.target.value}) }
          
        />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          placeholder="Enter description"
          className="input-field"
          value={state.description}
          onChange={(e) =>dispatch({type:"description"  , payload : e.target.value}) }
         
          
        />
        <button type="submit" className="Addbtn" onClick={onAdd}
        disabled={disable}>
          Add
        </button>
        {/* checking if disable button is orking  */}
        {/* <p>Button disabled: {disable ? "Yes 🚫" : "No ✅"}</p> */} 
      </form>
    </>
  );
};

export default AddRemBal;
