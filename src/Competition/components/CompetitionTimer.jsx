import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const CompetitionTimer = ({ endTime, onTimeEnd }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endTime).getTime() - new Date().getTime();

      if (difference <= 0) {
        setIsEnded(true);
        if (onTimeEnd) onTimeEnd();
        return { hours: 0, minutes: 0, seconds: 0 };
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { hours, minutes, seconds };
    };

    // Initialize immediately
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime, onTimeEnd]);

  const formatTime = (value) => {
    return value.toString().padStart(2, '0');
  };

  return (
    <div className={`flex items-center space-x-2 ${isEnded ? 'text-red-500' : 'text-indigo-600'}`}>
      <Clock size={20} />
      {isEnded ? (
        <span className="font-medium">Time's up!</span>
      ) : (
        <span className="font-medium">
          {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
        </span>
      )}
    </div>
  );
};

export default CompetitionTimer;
