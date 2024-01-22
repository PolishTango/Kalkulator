import { Actions } from "./App"

export default function DigitButtons({ dispatch, digit}) {
    return (
    <button 
    onClick={ () => dispatch({ type: Actions.ADD, payload: {digit} })}
    >
        {digit}
    </button>
    )
}
