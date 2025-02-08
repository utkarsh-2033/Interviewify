import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";


const QuestionsIndex = (props) => {
  const { questions, activeQuestion } = props;

  if (!questions || !Array.isArray(questions)) {
    return <div>loading...</div>;
  }
  const readQuestionAloud = (text) => {
    const audiotext = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(audiotext);
  };

  return (
    <div className=" mt-8">
      {/* <h1 className="text-2xl font-bold text-center">Questions</h1> */}
      <ul className="mt-4 gap-2 flex flex-wrap">
        {questions.map((question, index) => (
          <li
            className={`p-1 px-3 rounded-3xl bg-gray-50 border border-gray-200 
              ${activeQuestion === index ? "bg-primary text-white" : ""}`}
            key={index}
          >
            Question #{index + 1}
          </li>
        ))}
      </ul>
      <div className="mt-8 mx-2 font-medium">
        <p>{questions[activeQuestion].question}</p>
        <span onClick={() => readQuestionAloud(questions[activeQuestion].question)}><Volume2/></span>
      </div>
      <div className=" mt-24 bg-blue-100 border-blue-700 text-primary p-4 rounded-md">
        <h1 className="font-bold text-lg flex items-center gap-2 mb-3">
          <Lightbulb />
          Note
        </h1>
        <p className="text-sm font-semibold">
          Enable Video Web Cam and Microphone to Start your Al Generated Mock
          Interview, It Has 5 question which you can answer and at the last you
          will get the report on the basis of your answers. NOTE Web cam access
          you can diable at any the if you want.
        </p>
      </div>
    </div>
  );
};

export default QuestionsIndex;
