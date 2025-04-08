import { useQuestions } from "../context/QuestionsProvider";
import Question from "./Question";

function Questions() {
  const { questions, index } = useQuestions();

  return (
    <div className="questions">
      <h1>Questions</h1>
      <ul>
        {questions.map((question, idx) => (
          <Question question={question} idx={idx} />
        ))}
      </ul>
    </div>
  );
}

export default Questions;
