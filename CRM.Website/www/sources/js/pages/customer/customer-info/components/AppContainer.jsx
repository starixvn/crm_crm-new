import React, { Component } from 'react';
import { connect } from 'react-redux';
import Filter from './Filter';
import PropTypes from 'prop-types';
import DataGrid from './DataGrid';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import LangHelper from '@jsroot/common/langHelper';
import { Button } from 'react-bootstrap';

export class AppContainer extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        isHost: PropTypes.bool.isRequired,
        editCustomerInfoPopup: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        getCustomerInfo: PropTypes.func
    };

    static defaultProps = {
        isHost: false,
        editCustomerInfoPopup: { show: false },
        getCustomerInfo: function () {
            //nothing
        }
    };

    handleEditSuccess = () => {
        this.props.getCustomerInfo(this.props.gridParams);
    };

    handleCloseEditCustomerInfoPopup = () => {
        this.props.setEditCustomerInfoPopup({ show: false });
    };

    render() {
        return (
            <div className="col-md-3">
                <Filter
                    isHost={this.props.isHost}
                />
                <DataGrid
                    isHost={this.props.isHost}
                    onSuccess={this.handleEditSuccess}
                />
                {
                    this.props.editCustomerInfoPopup.show &&
                    <SweetModalDialog size="lg"
                        title={LangHelper.getResource('Confirmation')}
                        contents={
                            <div>{LangHelper.getResource('EditCustomerInfoSuccessfully')}</div>
                        }
                        buttons={[
                            <Button variant="primary" size="sm" onClick={this.handleCloseEditCustomerInfoPopup}>
                                {LangHelper.getResource('OK')}
                            </Button>
                        ]}
                        onClose={this.handleCloseEditCustomerInfoPopup}
                    />
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, gridData, editCustomerInfoPopup } = state;
    return { gridParams, gridData, editCustomerInfoPopup };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);