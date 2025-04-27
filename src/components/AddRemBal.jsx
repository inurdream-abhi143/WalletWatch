// its form where we can add or remove balance
import {  useState } from "react";
const AddRemBal = ({ handleTransaction }) => {
  // const reducer = (state, action) => {};

  // const [inputField, dispatch] = useReducer(reducer, []);
  const [type, setType] = useState("Income");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");

  const onAdd = (e) => {
    e.preventDefault();
    if (amount < 0) {
      return alert("Amount should be greater than 0");
    }
    {
      const transactionDetails = {
        type: type,
        amount: Number(amount),
        description: description,
        date: new Date().toLocaleDateString(),
      };
      handleTransaction(transactionDetails);
      setAmount(0);
      setType("Income");
      setDescription("");
    }
  };
  return (
    <>
      <form className="add-rem-bal-form">
        <label htmlFor="type">Type</label>
        <select
          id="type"
          className="input-field"
          value={type}
          onChange={(e) => setType(e.target.value)}
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
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          placeholder="Enter description"
          className="input-field"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" className="Addbtn" onClick={onAdd}>
          Add
        </button>
      </form>
    </>
  );
};

export default AddRemBal;
