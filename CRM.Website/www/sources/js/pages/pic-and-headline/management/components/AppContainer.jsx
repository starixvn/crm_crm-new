import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import EditPicManagement from './EditPicManagement';
import NewPicManagement from './NewPicManagement';
import { toast } from 'react-toastify';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';
import DataGrid from './DataGrid';
import Filter from './Filter';
import LangHelper from '@jsroot/common/langHelper';

export class AppContainer extends PureComponent {
    static propTypes = {
        createPicPopup: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        editPicPopup: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        isHost: PropTypes.bool.isRequired
    };

    static defaultProps = {
        createPicPopup: { show: false },
        editPicPopup: { show: false },
        confirmPopup: { show: false },
        isHost: false
    };

    constructor(props) {
        super(props);
    }

    changeActiveStatus = () => {
        const { picId, checked } = this.props.confirmPopup;
        this.props.changeActiveStatus({ picId, IsActive: checked }).then(() => {
            this.closeConfirmActive();
            const { activeResult } = this.props;
            if (activeResult.isSuccessful) {
                const message = checked ? 'ActivePICSuccess' : 'DeactivatePICSuccess';
                toast.success(LangHelper.getResource(message));
                this.props.getGridData(this.props.gridParams);
            } else {
                toast.error(activeResult.message);
            }
        });
    };

    closeConfirmActive = () => {
        this.props.setConfirmPopup({
            show: false,
            username: '',
            picId: null,
            checked: false
        });
    };

    render() {
        return (
            <Fragment>
                <Filter isHost={this.props.isHost} />
                <DataGrid isHost={this.props.isHost} />
                {
                    this.props.createPicPopup.show &&
                    <NewPicManagement />
                }
                {
                    this.props.editPicPopup.show &&
                    <EditPicManagement />
                }
                {
                    this.props.confirmPopup.show &&
                    <ConfirmPopup
                        size='lg'
                        title={LangHelper.getResource('ChangePICState')}
                        content={
                            <div>
                                Are you sure you want to {this.props.confirmPopup.checked ? 'active' : 'deactivate'}
                                {` PIC ${this.props.confirmPopup.username}? `}
                                {
                                    this.props.confirmPopup.checked
                                        ? ''
                                        : LangHelper.formatString(
                                            'The PIC assignment shall be removed, and the Recipient {0} shall be removed from Chat Type Mapping if it exists.',
                                            this.props.confirmPopup.username)
                                }
                            </div>
                        }
                        onSubmit={this.changeActiveStatus}
                        onClose={this.closeConfirmActive}
                    />
                }
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, createPicPopup, editPicPopup, confirmPopup, activeResult } = state;
    return { gridParams, createPicPopup, editPicPopup, confirmPopup, activeResult };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);