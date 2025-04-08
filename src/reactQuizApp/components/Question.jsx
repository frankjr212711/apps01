import { useQuestions } from "../context/QuestionsProvider";


function Question({question, idx}) {
    console.log(question)
    return <li>
        <span></span>
        {/* <h6>{idx<9&&"0"}{idx+1}. {question.question}</h6> */}
    </li>
}

export default Question;