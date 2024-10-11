import React from 'react';

interface EvaluationDisplayProps {
  score: number;
  criteriaScores: { A: number; B: number; C: number };
  evaluationDate: string;
}

const EvaluationDisplay: React.FC<EvaluationDisplayProps> = ({ score, criteriaScores, evaluationDate }) => {
  return (
    <div className="p-4 border rounded">
      <h3>Evaluation Results</h3>
      <div className="flex items-center">
        <div className="w-24 h-24 border rounded-full flex items-center justify-center">
          <p>{score}%</p>
        </div>
        <div className="ml-4">
          <p>Criteria A: {criteriaScores.A}%</p>
          <p>Criteria B: {criteriaScores.B}%</p>
          <p>Criteria C: {criteriaScores.C}%</p>
          <p>Date: {evaluationDate}</p>
        </div>
      </div>
    </div>
  );
};

export default EvaluationDisplay;
