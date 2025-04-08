import Button from "../../Button";

import { useQuestions } from "../context/QuestionsProvider";
import PageNav from "../components/PageNav";
import Questions from "../components/Questions";

function Home() {
  const { questions, status, dispatch } = useQuestions();

  return (
    <div className="home">
      <header>
     <PageNav/>
        <h1>Welcome to React Quiz</h1>
        <h5>Click on the start buttton below to start Quiz</h5>
      </header>
      <main>
        {!status && <Button onClick={() => dispatch({ type: "start", payload: questions })}>
          start quiz
        </Button>}

        {status && <Questions />}
      </main>
    </div>
  );
}

export default Home;
