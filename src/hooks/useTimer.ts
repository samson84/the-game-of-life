import { useEffect, useState } from "react";

const INTERVAL = 500;

const useTimer = () => {
  const [running, setRunning] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (running) {
        setCount((prev) => prev + 1);
      }
    }, INTERVAL);
    return () => clearTimeout(timer);
  }, [running]);

  return {
    stop: () => setRunning(false),
    start: () => setRunning(true),
    running,
    count,
  };
};

export default useTimer;
