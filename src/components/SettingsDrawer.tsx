import React from 'react';
import { X } from 'lucide-react';
import { MeatIntakeData } from '../types';
import content from '../content.json';

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  meatIntakeData: MeatIntakeData;
  setMeatIntakeData: React.Dispatch<React.SetStateAction<MeatIntakeData>>;
}

const SettingsDrawer: React.FC<SettingsDrawerProps> = ({
  isOpen,
  onClose,
  meatIntakeData,
  setMeatIntakeData,
}) => {
  const handleDownload = () => {
    const dataStr = JSON.stringify(meatIntakeData);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'meat_intake_data.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          setMeatIntakeData(json);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className={`absolute bottom-0 left-0 right-0 bg-background rounded-t-3xl p-6 h-5/6 overflow-y-auto transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-primary">{content.settings.title}</h2>
          <button onClick={onClose} className="text-primary">
            <X />
          </button>
        </div>
        <div className="space-y-4">
          <button
            onClick={handleDownload}
            className="w-full py-2 bg-primary text-primary-contrast rounded-full"
          >
            {content.settings.downloadData}
          </button>
          <button className="w-full py-2 bg-primary text-primary-contrast rounded-full text-center cursor-pointer">
            {content.settings.uploadData}
            <input
              type="file"
              accept=".json"
              onChange={handleUpload}
              className="hidden"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsDrawer;