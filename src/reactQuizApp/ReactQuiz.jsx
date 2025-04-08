import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuestionsProvider } from "./context/QuestionsProvider";

import Home from "./pages/Home";
import AppPage from './pages/AppPage';
import Calls from "./components/Calls";
import Chats from "./components/Chats";
import Status from "./components/Status";

function ReactQuiz() {
  return (
    <div className="react-quiz-app">
      <QuestionsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="app" element={<AppPage />} >
                <Route path="calls" element={<Calls/>}/>
                <Route path="chats" element={<Chats/>}/>
                <Route path="status" element={<Status/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </QuestionsProvider>
    </div>
  );
}

export default ReactQuiz;
