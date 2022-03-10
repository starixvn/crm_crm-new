import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import LangHelper from '@jsroot/common/langHelper';
import { Button } from 'react-bootstrap';
import EditForm from './EditForm';

export class AppContainer extends Component {

    static propTypes = {
        editCustomerInfoDetailDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        getCustomerById: PropTypes.func
    };

    static defaultProps = {
        editCustomerInfoDetailDialog: { show: false },
        getCustomerById: function () {
            //nothing
        }
    };

    handleCloseEditDetailDialog = () => {
        this.props.setEditCustomerInfoDetailDialog({ show: false });
    };

    render() {
        return (
            <div>
                <EditForm id={this.props.id}/>
                {
                    this.props.editCustomerInfoDetailDialog.show &&
                    <SweetModalDialog size="sm"
                        title={LangHelper.getResource('Confirmation')}
                        contents={
                            <div>{LangHelper.getResource('EditCustomerInfoSuccessfully')}</div>
                        }
                        buttons={[
                            <Button variant="primary" size="sm" onClick={this.handleCloseEditDetailDialog}>
                                {LangHelper.getResource('OK')}
                            </Button>
                        ]}
                        onClose={this.handleCloseEditDetailDialog}
                    />
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { editCustomerInfoDetailDialog } = state;
    return { editCustomerInfoDetailDialog };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
