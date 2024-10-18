import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { MeatIntakeData } from '../types';
import content from '../content.json';
import { motion, AnimatePresence } from 'framer-motion';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  meatIntakeData: MeatIntakeData;
  onDataUpdate: (date: string, data: any) => void;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  selectedDate,
  meatIntakeData,
  onDataUpdate,
}) => {
  const [isMeatless, setIsMeatless] = useState(true);
  const [meatType, setMeatType] = useState<string[]>([]);
  const [meatMeals, setMeatMeals] = useState<string[]>([]);

  const dateString = selectedDate.toISOString().split('T')[0];

  useEffect(() => {
    if (dateString in meatIntakeData) {
      const data = meatIntakeData[dateString];
      setIsMeatless(data.isMeatless);
      setMeatType(data.meatType || []);
      setMeatMeals(data.meatMeals || []);
    } else {
      setIsMeatless(true);
      setMeatType([]);
      setMeatMeals([]);
    }
  }, [dateString, meatIntakeData]);

  const handleSave = () => {
    onDataUpdate(dateString, {
      isMeatless,
      meatType: isMeatless ? [] : meatType,
      meatMeals: isMeatless ? [] : meatMeals,
    });
    onClose();
  };

  const toggleMeatType = (type: string) => {
    setMeatType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleMeatMeal = (meal: string) => {
    setMeatMeals((prev) =>
      prev.includes(meal) ? prev.filter((m) => m !== meal) : [...prev, meal]
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-background rounded-t-3xl p-6 h-full overflow-y-auto"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-primary">
                {selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
              </h2>
              <button onClick={onClose} className="text-primary">
                <X />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="font-semibold mb-2 text-primary">{content.drawer.meatlessQuestion}</p>
                <div className="flex w-full bg-primary-contrast rounded-full">
                  <button
                    className={`flex-1 py-2 rounded-full ${
                      isMeatless ? 'bg-primary text-primary-contrast' : 'text-primary'
                    }`}
                    onClick={() => setIsMeatless(true)}
                  >
                    {content.drawer.yes}
                  </button>
                  <button
                    className={`flex-1 py-2 rounded-full ${
                      !isMeatless ? 'bg-primary text-primary-contrast' : 'text-primary'
                    }`}
                    onClick={() => setIsMeatless(false)}
                  >
                    {content.drawer.no}
                  </button>
                </div>
              </div>
              {!isMeatless && (
                <>
                  <div>
                    <p className="font-semibold mb-2 text-primary">{content.drawer.meatTypeQuestion}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {content.drawer.meatTypes.map((type) => (
                        <button
                          key={type}
                          className={`py-2 rounded-full ${
                            meatType.includes(type) ? 'bg-primary text-primary-contrast' : 'bg-primary-contrast text-primary'
                          }`}
                          onClick={() => toggleMeatType(type)}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold mb-2 text-primary">{content.drawer.mealQuestion}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {content.drawer.meals.map((meal) => (
                        <button
                          key={meal}
                          className={`py-2 rounded-full ${
                            meatMeals.includes(meal) ? 'bg-primary text-primary-contrast' : 'bg-primary-contrast text-primary'
                          }`}
                          onClick={() => toggleMeatMeal(meal)}
                        >
                          {meal}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
              <button
                className="w-full py-2 bg-primary text-primary-contrast rounded-full"
                onClick={handleSave}
              >
                {content.drawer.save}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Drawer;