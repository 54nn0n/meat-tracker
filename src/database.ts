import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { MeatIntakeData } from './types';

interface MeatTrackerDB extends DBSchema {
  meatIntake: {
    key: string;
    value: {
      isMeatless: boolean;
      meatType?: string[];
      meatMeals?: string[];
    };
  };
}

let db: IDBPDatabase<MeatTrackerDB>;

export const initializeDatabase = async () => {
  db = await openDB<MeatTrackerDB>('meat-tracker-db', 1, {
    upgrade(db) {
      db.createObjectStore('meatIntake');
    },
  });
};

export const saveMeatIntakeData = async (date: string, data: any) => {
  await db.put('meatIntake', data, date);
};

export const getMeatIntakeData = async (): Promise<MeatIntakeData> => {
  const allData = await db.getAll('meatIntake');
  const allKeys = await db.getAllKeys('meatIntake');
  
  return allKeys.reduce((acc, key, index) => {
    acc[key as string] = allData[index];
    return acc;
  }, {} as MeatIntakeData);
};