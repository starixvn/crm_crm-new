import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import DataGrid from './DataGrid';
import EditContactInforms from './EditContactInforms';
import EditSearchInforms from './EditSearchInforms';
import RemovedAccountLogs from './RemovedAccountLogs';

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
    }

    handleCloseShowEditContactInforms = () => {
        this.props.getInforms();
        this.props.setShowEditContactInform({show: false});
    }

    handleCloseShowEditSearchInforms = () => {
        this.props.getInforms();
        this.props.setShowEditSearchInform({show: false});
    }

    handleCloseShowRemovedLogs = () => {
        this.props.getInforms();
        this.props.setShowRemovedLogs({show: false});
    }

    render() {
        const { searchPolicy, contactPolicy, showEditContactInform, showEditSearchInform, showRemovedLogs, showRemovedLogDetails } = this.props;

        return (
            <>
                {
                    (!searchPolicy.hasAttribute('none') || !contactPolicy.hasAttribute('none')) &&
                    <DataGrid
                        contactPolicy={contactPolicy}
                        searchPolicy={searchPolicy}
                    />
                }
                {
                    showEditContactInform.show &&
                    <EditContactInforms
                        titleId={showEditContactInform.titleId}
                        onClose={this.handleCloseShowEditContactInforms}
                        selectedStatuses={showEditContactInform.selectedStatuses}
                        titleDetail={this.props.titleDetail}
                        contactInforms={this.props.contactInforms}
                        contactInformSettings={this.props.contactInformSettings}
                        gridParams={this.props.gridParams}
                        getContactInforms={this.props.getContactInforms}
                        setGridParams={this.props.setGridParams}
                        updateContactInforms={this.props.updateContactInforms}
                        resultUpdateContactInforms={this.props.resultUpdateContactInforms}
                        exportContactInforms={this.props.ExportContactInforms}
                    />
                }
                {
                    showEditSearchInform.show &&
                    <EditSearchInforms
                        titleId={showEditSearchInform.titleId}
                        onClose={this.handleCloseShowEditSearchInforms}
                        titleDetail={this.props.titleDetail}
                        includeCurrencies={showEditSearchInform.includeCurrencies}
                        includeSites={showEditSearchInform.includeSites}
                        searchInforms={this.props.searchInforms}
                        allSettings={this.props.allSettings}
                        getSearchInforms={this.props.getSearchInforms}
                        gridParams={this.props.gridParams}
                        setGridParams={this.props.setGridParams}
                        updateSearchInforms={this.props.updateSearchInforms}
                        resultUpdateSearchInforms={this.props.resultUpdateSearchInforms}
                        exportSearchInforms={this.props.ExportSearchInforms}
                    />
                }
                {
                    showRemovedLogs.show &&
                    <RemovedAccountLogs
                        onClose={this.handleCloseShowRemovedLogs}
                    />
                }
            </>
        );
    };
};

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        showEditContactInform, titleDetail, contactInforms,
        contactInformSettings, gridParams, showEditSearchInform,
        searchInforms, allSettings, resultUpdateContactInforms,
        resultUpdateSearchInforms, showRemovedLogs, showRemovedLogDetails
    } = state;
    return {
        showEditContactInform, titleDetail, contactInforms,
        contactInformSettings, gridParams, showEditSearchInform,
        searchInforms, allSettings, resultUpdateContactInforms,
        resultUpdateSearchInforms, showRemovedLogs, showRemovedLogDetails
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
