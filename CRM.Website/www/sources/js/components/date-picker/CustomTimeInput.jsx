import { Form } from 'react-bootstrap';
import React from 'react';

function CustomTimeInput({ date, dateTimeNow, isDisabledTime, onChange }) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const currentHourNow= ("0" + dateTimeNow.getHours()).slice(-2);
  const currentMinuteNow = ("0" + dateTimeNow.getMinutes()).slice(-2);
  const currentHour = hours.toString().padStart(2, '0');
  const currentMinute = minutes.toString().padStart(2, '0');
  const hourFormat = [...Array(24).keys()].map((item) =>
    item.toString().padStart(2, '0')
  );
  const minuteFormat = [...Array(60).keys()].map((item) =>
    item.toString().padStart(2, '0')
  );
  const timeAmPm = date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  const handleChangeHour = (evt) => {
    const minute = date.getMinutes();
    const time = `${evt.target.value}:${minute.toString().padStart(2, '0')}`;
    onChange(time);
  };

  const handleChangeMinute = (evt) => {
    const hour = date.getHours();
    const time = `${hour.toString().padStart(2, '0')}:${evt.target.value}`;
    onChange(time);
  };

  return (
    <div className="d-flex">
      <Form.Control
        as="select"
        size="sm"
        className="shadow-none mr-1"
        name="hour"
        id="hour"
        value={currentHour}
        onChange={handleChangeHour}
      >
        <option value="" hidden disabled />
        {hourFormat.map((item) => (
          <option
            key={item}
            value={item}
            disabled={isDisabledTime && currentHourNow > item}
          >
            {item}
          </option>
        ))}
      </Form.Control>
      <Form.Control
        as="select"
        size="sm"
        className="shadow-none mr-4"
        name="minute"
        id="minute"
        value={currentMinute}
        onChange={handleChangeMinute}
      >
        <option value="" hidden disabled />
        {minuteFormat.map((item) => (
          <option
            key={item}
            value={item}
            disabled={isDisabledTime && currentMinuteNow > item}
          >
            {item}
          </option>
        ))}
      </Form.Control>
      <Form.Control
        style={{ width: 70 }}
        type="text"
        size="sm"
        value={timeAmPm}
        disabled
      />
    </div>
  );
}

export default React.memo(CustomTimeInput);