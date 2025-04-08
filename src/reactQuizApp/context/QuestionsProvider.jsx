import { createContext, useContext, useEffect, useReducer } from "react";

const QuestionsContext = createContext();

const initialState = {
  questions: [],
  isLoading: false,
  status: false,
  index: 0,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "failed":
      return { ...state, isLoading: false, error: action.payload };
      case "start": 
      return {...state, isLoading: false, status: true }
    case "questions/loaded":
      return { ...state, isLoading: false, questions: action.payload };
  }
}

function QuestionsProvider({ children }) {
  const [{ questions, isLoading, status, index }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getQuestions() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`http://localhost:7000/questions`);
        const data = await res.json();
        dispatch({ type: "questions/loaded", payload: data });
      } catch (err) {
        dispatch({ type: "failed", payload: err.message });
      }
    }
    getQuestions();
  }, []);

//   console.log(questions);

  return (
    <QuestionsContext.Provider
      value={{
        questions,
        isLoading,
        status,
        index,
        dispatch
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
}
function useQuestions() {
  const context = useContext(QuestionsContext);
  if (context === undefined) throw new Error("unknown context");
  return context;
}

export { QuestionsProvider, useQuestions };
