import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MeatIntakeData } from '../types';
import content from '../content.json';

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  meatIntakeData: MeatIntakeData;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateSelect, meatIntakeData }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isWeekView, setIsWeekView] = useState(false);

  const handlePrevious = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      if (isWeekView) {
        newDate.setDate(newDate.getDate() - 7);
      } else {
        newDate.setMonth(newDate.getMonth() - 1);
      }
      return newDate;
    });
  };

  const handleNext = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      if (isWeekView) {
        newDate.setDate(newDate.getDate() + 7);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getDaysInMonth = (year: number, month: number) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const getDayStatus = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    const dayData = meatIntakeData[dateString];
    if (date.toDateString() === new Date().toDateString()) return 'bg-primary text-primary-contrast';
    if (!dayData) return 'bg-transparent';
    if (dayData.isMeatless) return 'bg-status-meatless';
    if (dayData.meatType?.includes('Fish')) return 'bg-status-fish';
    return 'bg-status-meat';
  };

  const getDayTextColor = (date: Date) => {
    if (date.toDateString() === new Date().toDateString()) return 'text-primary-contrast';
    return date > new Date() ? 'text-future' : 'text-primary';
  };

  const getVisibleDays = () => {
    if (isWeekView) {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      return Array.from({ length: 7 }, (_, i) => {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        return day;
      });
    } else {
      const days = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
      const firstDayOfMonth = days[0].getDay();
      const lastDayOfMonth = days[days.length - 1].getDay();
      
      // Add days from previous month
      for (let i = 0; i < firstDayOfMonth; i++) {
        const prevMonthDay = new Date(days[0]);
        prevMonthDay.setDate(prevMonthDay.getDate() - (firstDayOfMonth - i));
        days.unshift(prevMonthDay);
      }
      
      // Add days from next month
      for (let i = lastDayOfMonth; i < 6; i++) {
        const nextMonthDay = new Date(days[days.length - 1]);
        nextMonthDay.setDate(nextMonthDay.getDate() + 1);
        days.push(nextMonthDay);
      }
      
      return days;
    }
  };

  const visibleDays = getVisibleDays();

  const handleTodayClick = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevious} className="p-2 text-primary">
          <ChevronLeft />
        </button>
        <h2 className="text-lg font-semibold text-primary">
          {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={handleNext} className="p-2 text-primary">
          <ChevronRight />
        </button>
      </div>
      <button
        onClick={handleTodayClick}
        className="mb-4 px-4 py-2 bg-primary text-primary-contrast rounded-full text-sm"
      >
        Today
      </button>
      <div className="grid grid-cols-7 gap-2 mb-2 justify-items-center">
        {content.calendar.weekDays.map(day => (
          <div key={day} className="text-center font-semibold text-primary">
            {day}
          </div>
        ))}
      </div>
      <div className={`grid grid-cols-7 gap-2 justify-items-center transition-all duration-300 ${isWeekView ? 'h-16' : 'h-auto'}`}>
        {visibleDays.map((date, index) => (
          <button
            key={index}
            className={`w-8 h-8 flex items-center justify-center rounded-full ${getDayStatus(date)} ${
              date.toDateString() === selectedDate.toDateString() ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => onDateSelect(date)}
            disabled={date > new Date()}
          >
            <span className={`${getDayTextColor(date)} text-center`}>{date.getDate()}</span>
          </button>
        ))}
      </div>
      <button
        className="mt-4 w-full py-2 bg-transparent text-secondary text-xs rounded-full"
        onClick={() => setIsWeekView(!isWeekView)}
      >
        {isWeekView ? content.calendar.switchToMonthView : content.calendar.switchToWeekView}
      </button>
    </div>
  );
};

export default Calendar;