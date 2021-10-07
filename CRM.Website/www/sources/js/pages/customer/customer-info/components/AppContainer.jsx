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
        editCustomerInfoPopup: PropTypes.shape({ show: PropTypes.bool }).isRequired
    };

    static defaultProps = {
        isHost: false,
        editCustomerInfoPopup: { show: false }
    };

    handleCloseEditCustomerInfoPopup = () => {
        this.props.setEditCustomerInfoPopup({ show: false });
    };

    render() {
        const { isHost, editCustomerInfoPopup } = this.props;
        return (
            <div className="col-md-3">
                <Filter isHost={isHost} />
                <DataGrid isHost={isHost} />
                {
                    editCustomerInfoPopup.show &&
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
    const { editCustomerInfoPopup } = state;
    return { editCustomerInfoPopup };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);