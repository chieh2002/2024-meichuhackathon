import React from 'react';

function PointsDisplay({ points }) {
  return (
    <div className="points-display">
      <h3>剩餘點數: {points}</h3>
    </div>
  );
}

export default PointsDisplay;
