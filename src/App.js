import { useReducer } from "react"
import DigitButtons from "./DigitButtons"
import OperationButtons from "./OperationButtons"
import "./style.css"


export const Actions = {
    ADD: 'Add',
    SUBSTRACTION: 'subtraction',
    MULTIPLICATION: "Multiplication",
    DIVISION: "Division",
    CLEARALL: 'Clear',
    REMOVE: 'remove',
    CHOOSE_OPERATION: 'choose_operation',
    EVALUATE: 'evaluate'
}

function reducer(state, {type, payload}){
    switch (type) {
        case Actions.ADD:
            if (state.overwrite){
                return{
                    ...state,
                    currentOperand: payload.digit,
                    overwrite:false,
                }
            } 

            
            if(payload.digit === "0" && state.currentOperand === "0") {
                return state
            }
            if(payload.digit === "." && state.currentOperand.includes (".")){
                 return state
                } 
            return {
                ...state,
                currentOperand: `${state.currentOperand || ""}${payload.digit}`,
            }
            case Actions.CHOOSE_OPERATION:
                if (state.currentOperand == null && state.previousOperand == null){
                    return state
                }
                if (state.currentOperand == null){
                    return{
                        ...state,
                        operation: payload.operation,
                    }
                }


                if (state.previousOperand == null) {
                    return {
                        ...state,
                        operation:  payload.operation,
                        previousOperand: state.currentOperand,
                        currentOperand: null,
                    }
                }
            return{
                ...state,
                previousOperand: EVALUATE(state),
                operation: payload.operation,
                currentOperand: null
            }
            case Actions.CLEARALL:
                return{}
                case Actions.REMOVE:
                    if (state.overwrite){
                        return{
                            ...state,
                            overwrite: false,
                            currentOperand: null
                        }
                    }
                    if (state.currentOperand ==null) return state
                    if (state.currentOperand.length === 1){
                        return {...state, currentOperand: null}
                    }
                    return{
                        ...state,
                        currentOperand: state.currentOperand.slice(0, -1)
                    }
            case Actions.EVALUATE:
                if (
                    state.operation == null ||
                    state.currentOperand == null ||
                    state.previousOperand == null
                ) {
                    return state
                }

                return {
                    ...state,
                    overwrite: true,
                    previousOperand: null,
                    operation: null,
                    currentOperand: EVALUATE(state),
                }
    }
}

function EVALUATE({ currentOperand, previousOperand, operation}) {
    const prev = parseFloat(previousOperand)
    const current = parseFloat(currentOperand)
    if (isNaN (prev) || isNaN(current)) 
    return ""
    let computation = ""
    switch (operation){
        case "+":
            computation = prev + current
            break
            case"-":
            computation = prev - current
            break
            case"*":
            computation = prev * current
            break
            case"/":
            computation = prev / current
            break
    }
    return computation.toString()
}
const INTEGER_FORMATTER = new Intl.NumberFormat("en-us",{ maximumFractionDigits: 0,})
function formatOperand(operand){
    if (operand == null) return
    const [integer, decimal] = operand.split('.')
    if (decimal ==null) return INTEGER_FORMATTER.format(integer)
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App(){
    const [{currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer,{}) 
    return (
        <div className="Calculator-Grid"> 
        <div className="Output">        
        <div className="Previous-Operation">{formatOperand(previousOperand)}{operation} </div>    
        <div className="Current-Operation">{formatOperand(currentOperand)} </div>
        </div>
        <button className="Two-buttons" 
            onClick={() => dispatch({ type: Actions.CLEARALL }) } >AC </button>
        
        <button  onClick={() => dispatch({ type: Actions.REMOVE }) } >DEL</button>
    
        <OperationButtons operation="/" dispatch={dispatch} ></OperationButtons>
        <DigitButtons digit="1" dispatch={dispatch} ></DigitButtons>
        <DigitButtons digit="2" dispatch={dispatch} ></DigitButtons>
        <DigitButtons digit="3" dispatch={dispatch} ></DigitButtons>
        <OperationButtons operation="*" dispatch={dispatch} ></OperationButtons>
        <DigitButtons digit="4" dispatch={dispatch} ></DigitButtons>
        <DigitButtons digit="5" dispatch={dispatch} ></DigitButtons>
        <DigitButtons digit="6" dispatch={dispatch} ></DigitButtons>
        <OperationButtons operation="+" dispatch={dispatch} ></OperationButtons>
        <DigitButtons digit="7" dispatch={dispatch} ></DigitButtons>
        <DigitButtons digit="8" dispatch={dispatch} ></DigitButtons>
        <DigitButtons digit="9" dispatch={dispatch} ></DigitButtons>
        <OperationButtons operation="-" dispatch={dispatch} ></OperationButtons>
        <DigitButtons digit="." dispatch={dispatch} ></DigitButtons>
        <DigitButtons digit="0" dispatch={dispatch} ></DigitButtons>
        <button className="Two-buttons" onClick={() => dispatch({ type: Actions.EVALUATE }) }>=</button>

        </div>
    )
}
export default App