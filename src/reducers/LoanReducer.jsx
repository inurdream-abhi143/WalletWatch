const LoanReducer = (state, action )=>{
  switch(action.type){
    case "type":
      return{
        ...state,
        loanType:action.payload
  
      }
      case "loanAmount":
        return{
          ...state,
          loanAmount: action.payload
    
        }
        case "description":
          return{
            ...state,
            loanDescription: action.payload
      
          }
          case "emiRate":
            return{
              ...state,
              emiRate: action.payload
        
            }
            case "emiDuration":
              return{
                ...state,
                emiDuration: action.payload
              }
  
              case "Reset":
                return{
                  type: "credit",
                  loanAmount: 0,
                  loanDescription: "",
                  emiRate: 0,
                  emiDuration:0,
                }
              default:
                return state
  
  
  }
  
  }

  export default LoanReducer;