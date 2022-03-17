import React from 'react';
import { useRecoilState } from 'recoil';
import { hourSelector, minuteState } from './components/atoms';

function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const [hours, setHours] = useRecoilState(hourSelector);
  const onMinutesChange = (e: React.FormEvent<HTMLInputElement>) => {
    // 앞에 +를 붙여주면 숫자로 바뀜
    setMinutes(+e.currentTarget.value)
  }

  const onHoursChange = (e: React.FormEvent<HTMLInputElement>) => {
    // 앞에 +를 붙여주면 숫자로 바뀜
    setHours(+e.currentTarget.value);
  };
  return (
    <div>
      <form>
        <input
          value={minutes}
          onChange={onMinutesChange}
          type="number"
          placeholder="Minutes"
        />
        <input
          value={hours}
          onChange={onHoursChange}
          type="number"
          placeholder="Hours"
        />
      </form>
    </div>
  );
}

export default App;
