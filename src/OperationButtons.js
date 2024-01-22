import { Actions } from "./App"

export default function OperationButtons({ dispatch, operation}) {
    return (
    <button 
    onClick={ () => dispatch({ type: Actions.CHOOSE_OPERATION, payload: {operation} })}
    >
        {operation}
    </button>
    )
}
