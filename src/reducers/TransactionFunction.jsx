  const TransactionFunction =(state,action)=> {
    switch(action.type){
    case "type":
return{
  ...state,
  type: action.payload

}    
   case "amount":

   return{
    ...state,
    amount: action.payload

   }

  case "description":
    return{

      ...state,
      description: action.payload

    }
    case "Reset":
      return{
        ...state,
        type: "Income",
      amount: "",
      description : ""
      }
    default:
     return  state
    
  }

  }


  export default TransactionFunction;
