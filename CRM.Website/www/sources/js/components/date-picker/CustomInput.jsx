import React, { Fragment } from 'react';
import { Form } from 'react-bootstrap';

export default class CustomInput extends React.PureComponent {
    render() {
        const { disabled, onClick, value, isInvalid } = this.props;

        return (
            <Fragment>
                <Form.Control as='input' className="shadow-none" size="sm" isInvalid={isInvalid}
                    readOnly disabled={disabled} onClick={onClick} value={value}
                />
                <i className='date-picker-icon fa fa-calendar' onClick={onClick} />
            </Fragment>
        );
    }
}