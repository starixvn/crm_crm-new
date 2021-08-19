import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import DataGrid from './DataGrid';
import EditContactInforms from './EditContactInforms';
import EditSearchInforms from './EditSearchInforms';
import RemovedAccountLogs from './RemovedAccountLogs';
import RemovedAccountLogDetails from './RemovedAccountLogDetails';
import NewInforms from './NewInforms';
import OptionsEdit from './OptionsEdit';

export class AppContainer extends Component {
    static propTypes = {
        searchPolicy: PropTypes.instanceOf(Element).isRequired,
        contactPolicy: PropTypes.instanceOf(Element).isRequired,
        getInforms: PropTypes.func
    };

    static defaultProps = {
        searchPolicy: null,
        contactPolicy: null,
        getInforms: function (){
            // nothing
        }
    };

    componentDidMount() {
        this.props.getInforms();
    };

    handleCloseShowEditContactInforms = () => {
        this.props.getInforms();
        this.props.setShowEditContactInform({show: false});
    };

    handleCloseShowEditSearchInforms = () => {
        this.props.getInforms();
        this.props.setShowEditSearchInform({show: false});
    };

    handleCloseShowRemovedLogs = () => {
        this.props.setShowRemovedLogs({show: false});
    };

    handleCloseShowRemovedLogDetails = () => {
        this.props.setShowRemovedLogDetails({show: false});
    };

    handleCloseShowNewInforms = () => {
        this.props.setShowNewInforms({show: false});
    };

    render() {
        const { searchPolicy, contactPolicy, showEditContactInform, showEditSearchInform, showRemovedLogs, showRemovedLogDetails, showNewInforms, showOptions } = this.props;

        return (
            <>
                {
                    (!searchPolicy.hasAttribute('none') || !contactPolicy.hasAttribute('none')) &&
                    (
                        <>
                            <DataGrid
                                contactPolicy={contactPolicy}
                                searchPolicy={searchPolicy}
                            />
                            {
                                showOptions.show &&
                                <OptionsEdit
                                    ref={this.wrapperRef}
                                />
                            }
                        </>
                        
                    )
                }
                {
                    showEditContactInform.show &&
                    <EditContactInforms
                        titleId={showEditContactInform.titleId}
                        onClose={this.handleCloseShowEditContactInforms}
                    />
                }
                {
                    showEditSearchInform.show &&
                    <EditSearchInforms
                        titleId={showEditSearchInform.titleId}
                        onClose={this.handleCloseShowEditSearchInforms}
                    />
                }
                {
                    showRemovedLogs.show &&
                    <RemovedAccountLogs
                        onClose={this.handleCloseShowRemovedLogs}
                    />
                }
                {
                    showRemovedLogDetails.show &&
                    <RemovedAccountLogDetails
                        onClose={this.handleCloseShowRemovedLogDetails}
                    />
                }
                {
                    showNewInforms.show &&
                    <NewInforms
                        onClose={this.handleCloseShowNewInforms}
                    />
                }
            </>
        );
    };
};

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        showEditContactInform, showEditSearchInform, showRemovedLogs, showRemovedLogDetails, showNewInforms, showOptions } = state;
    return {
        showEditContactInform, showEditSearchInform, showRemovedLogs, showRemovedLogDetails, showNewInforms, showOptions
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
