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

  const StatCard: React.FC<{ title: string; value: number | string }> = ({ title, value }) => (
    <div className="bg-primary-contrast rounded-lg p-4">
      <h4 className="text-primary">{title}</h4>
      <p className="text-lg font-bold text-primary">
        {typeof value === 'number' ? `${value} ${value === 1 ? 'day' : 'days'}` : value}
      </p>
    </div>
  );

  return (
    <div className="w-full max-w-md mt-6">
      <h3 className="text-lg font-semibold mb-4 text-primary">{content.summary.title}</h3>
      <div className="grid grid-cols-2 gap-4">
        <StatCard title={content.summary.totalDaysLogged} value={summary.totalDays} />
        <StatCard title={content.summary.totalDaysMeatless} value={summary.meatlessDays} />
        <StatCard title={content.summary.mostCommonMeatTime} value={summary.mostCommonMeatTime} />
        <StatCard 
          title={content.summary.meatTypeCounts} 
          value={Object.entries(summary.meatTypes)
            .map(([type, count]) => `${type}: ${count}`)
            .join(', ')} 
        />
      </div>
    </div>
  );
};

export default Summary;