import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import { isEmpty } from 'lodash';

class FormikErrorMessage extends PureComponent {
    static propTypes = {
        errors: PropTypes.object,
        fieldNames: PropTypes.arrayOf(PropTypes.string),
        touched: PropTypes.object,
        isSubmitting: PropTypes.bool
    };

    static defaultProps = {
        touched: {},
        errors: {},
        fieldNames: [],
        isSubmitting: false
    };

    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        const { isSubmitting, errors, touched, fieldNames } = this.props;
        const isError = this.isHasError(errors, touched);
        const isInvalid = fieldNames.filter(field => errors[field]).length > 0;

        if(isSubmitting && isError && isInvalid){
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

    isHasError = (errors, touched) => !isEmpty(errors) && !isEmpty(touched);

    validateFormikField = (touched, errors, fieldName) => !(touched[fieldName] && errors[fieldName]);

    render() {
        const { errors, touched, fieldNames } = this.props;
        return (
            this.isHasError(errors, touched)
            && <Alert variant='danger'>
                <ul className='list-message-error'>
                    {
                        fieldNames.map(field => {
                            const isValid = this.validateFormikField(touched, errors, field);
                            return !isValid && <li key={field}>{errors[field]}</li>;
                        })
                    }
                </ul>
            </Alert>
        );
    }
}

export default FormikErrorMessage;