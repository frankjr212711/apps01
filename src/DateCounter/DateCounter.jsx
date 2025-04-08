import { useReducer, useState } from "react";

function reducer(state, action) {
  console.log(state);
  console.log(action);
}
function DateCounter() {
  const [count, dispatch] = useReducer(reducer, 0);
  const [step, setStep] = useState(1);

  function decrease() {}

  function increase() {
    dispatch(1);
  }

  return (
    <div>
      <div className="row">
        <button onClick={decrease}>&larr;</button>

        <button onClick={increase}>&rarr;</button>
      </div>
    </div>
  );
}

export default DateCounter;
