import React, { PureComponent } from 'react';
import { Form } from 'react-bootstrap';
export class CustomTimeInput extends PureComponent {
    handleChangeHour = evt => {
        const {date, onChange} = this.props;
        const minute = date.getMinutes();
        const time = `${evt.target.value}:${minute}`;
        onChange(time);
    };

    handleChangeMinute = evt => {
        const {date, onChange} = this.props;
        const hour = date.getHours();
        const time = `${hour}:${evt.target.value}`;
        onChange(time);
    };


    render() {
        const {date} = this.props;
        const hour= date.getHours();
        const minute = date.getMinutes();
        const currentHour = ("0" + hour).slice(-2);
        const currentMinute = ("0" + minute).slice(-2);
        const hoursArr = [...Array(24).keys()];
        const minutesArr = [...Array(60).keys()];
        const hourFormat = hoursArr.map(item => (item < 10 ? '0' : '') + item);
        const minuteFormat = minutesArr.map(item => (item < 10 ? '0' : '') + item);
        const timeAmPm = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        return (
            <div className='d-flex'>
                <Form.Control as="select" size="sm" className="shadow-none mr-2"
                    name="hour" id="hour" value={currentHour} onChange={this.handleChangeHour}
                >
                    <option value="" hidden disabled />
                    {hourFormat.map(item => <option key={item} value={item}>{item}</option>)}
                </Form.Control>
                <Form.Control as="select" size="sm" className="shadow-none mr-4"
                    name="minute" id="minute" value={currentMinute} onChange={this.handleChangeMinute}
                >
                    <option value="" hidden disabled />
                    {minuteFormat.map(item => <option key={item} value={item}>{item}</option>)}
                </Form.Control>
                <Form.Control style={{width: 65}} type="text" size="sm" value={timeAmPm} disabled/>
            </div>
        );
    }
}

export default CustomTimeInput;
