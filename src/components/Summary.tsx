import React from 'react';
import { MeatIntakeData } from '../types';
import content from '../content.json';

interface SummaryProps {
  meatIntakeData: MeatIntakeData;
}

const Summary: React.FC<SummaryProps> = ({ meatIntakeData }) => {
  const calculateSummary = () => {
    const totalDays = Object.keys(meatIntakeData).length;
    const meatlessDays = Object.values(meatIntakeData).filter(day => day.isMeatless).length;
    
    const meatTimes: { [key: string]: number } = {};
    const meatTypes: { [key: string]: number } = {};

    Object.values(meatIntakeData).forEach(day => {
      if (!day.isMeatless) {
        day.meatMeals?.forEach(meal => {
          meatTimes[meal] = (meatTimes[meal] || 0) + 1;
        });
        day.meatType?.forEach(type => {
          meatTypes[type] = (meatTypes[type] || 0) + 1;
        });
      }
    });

    const mostCommonMeatTime = Object.entries(meatTimes).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    return {
      totalDays,
      meatlessDays,
      mostCommonMeatTime,
      meatTypes
    };
  };

  const summary = calculateSummary();

  return (
    <div className="w-full max-w-md mt-6 p-4 bg-primary-contrast rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2 text-primary">{content.summary.title}</h3>
      <ul className="space-y-2">
        <li className="text-primary">{content.summary.totalDaysLogged}: {summary.totalDays}</li>
        <li className="text-primary">{content.summary.totalDaysMeatless}: {summary.meatlessDays}</li>
        <li className="text-primary">{content.summary.mostCommonMeatTime}: {summary.mostCommonMeatTime}</li>
        <li className="text-primary">
          {content.summary.meatTypeCounts}:
          <ul className="ml-4">
            {Object.entries(summary.meatTypes).map(([type, count]) => (
              <li key={type}>{type}: {count}</li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Summary;