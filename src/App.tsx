import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import Drawer from './components/Drawer';
import MeatlessStreak from './components/MeatlessStreak';
import Summary from './components/Summary';
import SettingsDrawer from './components/SettingsDrawer';
import { MeatIntakeData } from './types';
import { initializeDatabase, saveMeatIntakeData, getMeatIntakeData } from './database';
import content from './content.json';
import { Settings } from 'lucide-react';

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDrawer, setShowDrawer] = useState(false);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);
  const [meatIntakeData, setMeatIntakeData] = useState<MeatIntakeData>({});

  useEffect(() => {
    const loadData = async () => {
      await initializeDatabase();
      const data = await getMeatIntakeData();
      setMeatIntakeData(data);
    };
    loadData();
    setupNotification();
  }, []);

  const setupNotification = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          scheduleNotification();
        }
      });
    }
  };

  const scheduleNotification = () => {
    const now = new Date();
    const notificationTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 22, 0, 0);
    if (now > notificationTime) {
      notificationTime.setDate(notificationTime.getDate() + 1);
    }
    const timeUntilNotification = notificationTime.getTime() - now.getTime();

    setTimeout(() => {
      new Notification('Meat Intake Tracker', {
        body: 'Did you go meatless today?',
      });
      scheduleNotification(); // Schedule the next notification
    }, timeUntilNotification);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setShowDrawer(true);
  };

  const handleDrawerClose = () => {
    setShowDrawer(false);
  };

  const handleSettingsDrawerClose = () => {
    setShowSettingsDrawer(false);
  };

  const handleDataUpdate = async (date: string, data: any) => {
    const updatedData = {
      ...meatIntakeData,
      [date]: data,
    };
    setMeatIntakeData(updatedData);
    await saveMeatIntakeData(date, data);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-4 font-jost">
      <div className="w-full max-w-md pb-24">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-primary">{content.app.title}</h1>
          <button onClick={() => setShowSettingsDrawer(true)} className="text-primary">
            <Settings />
          </button>
        </div>
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
        <SettingsDrawer
          isOpen={showSettingsDrawer}
          onClose={handleSettingsDrawerClose}
          meatIntakeData={meatIntakeData}
          setMeatIntakeData={setMeatIntakeData}
        />
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-background py-4">
        <div className="max-w-md mx-auto px-4">
          <button
            className="w-full h-14 bg-primary text-primary-contrast font-semibold rounded-full"
            onClick={() => setShowDrawer(true)}
          >
            {content.app.logIntakeButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;