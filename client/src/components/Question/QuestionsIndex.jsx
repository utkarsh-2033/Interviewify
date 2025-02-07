import React from 'react';

const QuestionsIndex = (props) => {
  const { questions } = props;

  if (!questions || !Array.isArray(questions)) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h1 className='text-2xl font-bold text-center'>Questions</h1>
      <ul className='mt-4 gap-4 grid grid-cols-3'>
        {questions.map((question, index) => (
          <li className='p-2 px-4 rounded-3xl bg-gray-50 border border-gray-200' key={index}>
            Question #{index + 1}:
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsIndex;