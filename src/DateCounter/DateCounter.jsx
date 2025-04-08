import { useReducer } from "react";

function reducer(state, action) {
    console.log(state)

}
function DateCounter() {
    const [{count}, dispatch ]= useReducer(reducer, 0)

    return <div >
        <div className="row">
            <button >&larr;</button>   
        <h5>{count}</h5>
            <button >&rarr;</button> 
        </div>    
    </div>
}

export default DateCounter;