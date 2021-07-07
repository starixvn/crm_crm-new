import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import CreateForm from './CreateForm';
import AddRelatedCustomerDialog from './AddRelatedCustomerDialog';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import LangHelper from '@jsroot/common/langHelper';

export class AppContainer extends Component {
    static propTypes = {
        getSettings: PropTypes.func
    };

    static defaultProps = {
        getSettings: function () {
            // nothing
        }
    };

    componentDidMount() {
        this.props.getSettings();
    }

    handleCloseViewRelatedCustomerDialog = () => {
        this.props.setViewRelatedCustomerDialog({ show: false });
    }

    render() {
        const { settings, addRelatedCustomerDialog, viewRelatedCustomerDialog } = this.props;
        if (settings === null) {
            return null;
        }

        return (
            <Fragment>
                <CreateForm />
                {
                    addRelatedCustomerDialog.show &&
                    <AddRelatedCustomerDialog />
                }
                {
                    viewRelatedCustomerDialog.show &&
                    <SweetModalDialog className="view-related-customer-modal-dialog" size="lg"
                        title={LangHelper.getResource('RelatedCustomer')}
                        contents={
                            <div>{viewRelatedCustomerDialog.relatedCustomers.map(item => item.username).join(', ')}</div>
                        }
                        buttons={[
                            <Button variant="primary" size="sm" onClick={this.handleCloseViewRelatedCustomerDialog}>
                                {LangHelper.getResource('Close')}
                            </Button>
                        ]}
                        onClose={this.handleCloseViewRelatedCustomerDialog}
                    />
                }
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        settings, addRelatedCustomerDialog, viewRelatedCustomerDialog
    } = state;
    return {
        settings, addRelatedCustomerDialog, viewRelatedCustomerDialog
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);