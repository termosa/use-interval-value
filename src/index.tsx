import * as React from 'react';

const noop = () => {};

export const useIntervalValue: UseIntervalValue = (ms, callback, paused = false) => {
  const [lastValue, setValue] = React.useState(() => callback(noop));

  React.useEffect(() => {
    let intervalId: number;
    const clearInterval = () => window.clearInterval(intervalId);
    intervalId = window.setInterval(() => {
      if (paused) return;
      const newValue = callback(clearInterval);
      if (newValue !== lastValue) setValue(newValue);
    }, ms);
    return clearInterval;
  }, [ms, callback]);

  return lastValue;
};

export default useIntervalValue;

interface UseIntervalValue {
  <T>(ms: number, fn: IntervalCallback<T>, paused?: boolean): T
}

export interface IntervalCallback<T> {
  (clearInterval: () => void): T
}