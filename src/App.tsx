import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import Drawer from './components/Drawer';
import MeatlessStreak from './components/MeatlessStreak';
import Summary from './components/Summary';
import { MeatIntakeData } from './types';

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDrawer, setShowDrawer] = useState(false);
  const [meatIntakeData, setMeatIntakeData] = useState<MeatIntakeData>({});

  useEffect(() => {
    const storedData = localStorage.getItem('meatIntakeData');
    if (storedData) {
      setMeatIntakeData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('meatIntakeData', JSON.stringify(meatIntakeData));
  }, [meatIntakeData]);

  const handleDateSelect = (date: Date) => {
    if (date <= new Date()) {
      setSelectedDate(date);
      setShowDrawer(true);
    }
  };

  const handleDrawerClose = () => {
    setShowDrawer(false);
  };

  const handleDataUpdate = (date: string, data: any) => {
    setMeatIntakeData((prevData) => ({
      ...prevData,
      [date]: data,
    }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4 text-primary">Meat Intake Tracker</h1>
      <MeatlessStreak meatIntakeData={meatIntakeData} />
      <Calendar
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
        meatIntakeData={meatIntakeData}
      />
      <Summary meatIntakeData={meatIntakeData} />
      <Drawer
        isOpen={showDrawer}
        onClose={handleDrawerClose}
        selectedDate={selectedDate}
        meatIntakeData={meatIntakeData}
        onDataUpdate={handleDataUpdate}
      />
    </div>
  );
};

export default App;