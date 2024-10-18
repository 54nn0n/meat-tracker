import React from 'react';
import { MeatIntakeData } from '../types';
import content from '../content.json';

interface MeatlessStreakProps {
  meatIntakeData: MeatIntakeData;
}

const MeatlessStreak: React.FC<MeatlessStreakProps> = ({ meatIntakeData }) => {
  const calculateMeatlessStreak = () => {
    const sortedDates = Object.keys(meatIntakeData).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    let streak = 0;
    let streakStartDate = null;

    for (const date of sortedDates) {
      if (meatIntakeData[date].isMeatless) {
        streak++;
        if (!streakStartDate) {
          streakStartDate = date;
        }
      } else {
        break;
      }
    }

    return { streak, streakStartDate };
  };

  const { streak, streakStartDate } = calculateMeatlessStreak();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const formatRelativeDays = (days: number) => {
    if (days === 1) return '1 day';
    if (days < 7) return `${days} days`;
    const weeks = Math.floor(days / 7);
    const remainingDays = days % 7;
    if (remainingDays === 0) return `${weeks} ${weeks === 1 ? 'week' : 'weeks'}`;
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} and ${remainingDays} ${remainingDays === 1 ? 'day' : 'days'}`;
  };

  return (
    <div className="w-full max-w-md mb-6 p-4 bg-primary-contrast rounded-lg">
      <p className="text-primary">
        {content.streak.prefix} {streakStartDate ? formatDate(streakStartDate) : 'today'}. {content.streak.suffix}
      </p>
      <p className="text-lg font-semibold text-primary">
        {formatRelativeDays(streak)}
      </p>
    </div>
  );
};

export default MeatlessStreak;