import logo from "./logo.svg";
import "./App.css";
import questions from "./data/questions.json";
import { useState } from "react";


function App() {
  const [allQuestions, setAllQuestions] = useState(questions);
  const [qIndex , setQIndex] = useState(0);
  const [score, setScore] = useState(0);



  

  const selectOption = (qid, op) => {
    const copyQuestions = [...allQuestions];
    const question = copyQuestions.find((q) => q.id === qid);
    question.selectedOption = op;
    setAllQuestions(copyQuestions);
    console.log(allQuestions);
   
  };
 
    const getOptionStyle = (q, op) => {
    const style = "list-group-item";

    if(op !== q.selectedOption)
        return style;

    if(op === q.answer)
      return style + " bg-success";
    else
      return style + " bg-danger";
  }
  const Score = () => {
    const question = allQuestions.filter(
      (q) => q.selectedOption === q.answer
    );
    setScore(question.length);
  };
 
  
  
const q= allQuestions[qIndex];


const Next = qIndex < allQuestions.length - 1;
const Previous = qIndex > 0;

const goToNextQuestion = () => {
  if (Next) {
    setQIndex(qIndex + 1);
  }
};

const goToPreviousQuestion = () => {
  if (Previous) {
    setQIndex(qIndex - 1);
  }
};

  return (
    <>
      <div className="container my-2">
        <h1 className="bg-warning text-center">Quiz App </h1>


        
          <div className="card my-2" key={q.id}>
            <div className="card-header my-2">{q.statment}</div>

            <ul className="list-group">
            {q.options.map((op) => (
              <li
                key={op}
                className={getOptionStyle(q, op)}
                onClick={() => selectOption(q.id, op)}
              >
                {op}
              </li>
          ))}
            </ul>
          </div>
        


          <button className="btn btn-warning" onClick={goToNextQuestion} disabled={!Next}>
          Next
        </button>
        <button className="btn btn-primary m-2" onClick={goToPreviousQuestion} disabled={!Previous}>
          Previous
        </button>
      

      </div>
<hr/>
<button className="btn btn-success m-2" onClick={Score}>
          Show Result
        </button>

        {score !== 0 && (
          <div className="result-container mt-3">
            <h3>Result:</h3>
            <p>Correct Answers: {score}</p>
            <p>Wrong Answers: {allQuestions.length - score}</p>
          </div>

        )}
    </>
  );
}

export default App;
