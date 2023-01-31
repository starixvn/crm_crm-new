import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

class ResponseMessage extends Component {
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

    componentDidMount(){
        this.handleScrollToTop();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.message !== this.props.message || JSON.stringify(prevProps.message) !== JSON.stringify(this.props.message)) {
            this.handleScrollToTop();
        }
    }

    handleScrollToTop = () =>{
        if(this.props.message !== '' || this.props.messages.length > 0) {
            const modal = document.querySelector('.modal');
            if(modal){
                modal.scrollTop = 0;
            }else{
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }
    }

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