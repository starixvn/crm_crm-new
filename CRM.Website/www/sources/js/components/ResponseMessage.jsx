import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

class ResponseMessage extends PureComponent {
    static propTypes = {
        isSuccessful: PropTypes.bool,
        message: PropTypes.string,
        messages: PropTypes.array
    };

    static defaultProps = {
        isSuccessful: false,
        message: '',
        messages: []
    };

    render() {
        const { isSuccessful, message, messages } = this.props;
        const variant = isSuccessful ? 'success' : 'danger';
        const className = `fa ${isSuccessful ? 'fa-check' : 'fa-exclamation-triangle'}`;

        return (
            message ? (
                    <Alert variant={variant} className='d-flex'>
                        <div className='d-inline'><i className={className} /></div>
                        <div className='ml-2 d-inline'>{message}</div>
                    </Alert>
                ) : (
                    <Alert variant={variant} className='d-flex flex-column'>
                        {
                            messages.map((item, index) => <div className='d-flex' key={index}>
                                <div className='d-inline'><i className={className} /></div>
                                <div className='ml-2 d-inline'>{item}</div>
                            </div>)
                        }
                    </Alert>
                )
        );
    }
}

export default ResponseMessage;