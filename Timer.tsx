import React from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  timeLeft: number;
}

const Timer: React.FC<TimerProps> = ({ timeLeft }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="flex items-center space-x-3">
      <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
        <Clock className="h-8 w-8" />
      </div>
      <div>
        <div className="text-2xl font-bold text-blue-600">{timeString}</div>
        <div className="text-xs text-gray-500">Waktu Tersisa</div>
      </div>
    </div>
  );
};

export default Timer;