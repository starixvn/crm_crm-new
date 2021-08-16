import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import DataGrid from './DataGrid';
import EditContactInforms from './EditContactInforms';
import EditSearchInforms from './EditSearchInforms';

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

    handleCloseEditContactInforms = () => {
        this.props.getInforms();
        this.props.setEditContactInform({show: false});
    }

    handleCloseEditSearchInforms = () => {
        this.props.getInforms();
        this.props.setEditSearchInform({show: false});
    }

    render() {
        const { searchPolicy, contactPolicy, editContactInform, editSearchInform } = this.props;

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
                    editContactInform.show &&
                    <EditContactInforms
                        titleId={editContactInform.titleId}
                        onClose={this.handleCloseEditContactInforms}
                        selectedStatuses={editContactInform.selectedStatuses}
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
                    editSearchInform.show &&
                    <EditSearchInforms
                        titleId={editSearchInform.titleId}
                        onClose={this.handleCloseEditSearchInforms}
                        titleDetail={this.props.titleDetail}
                        includeCurrencies={editSearchInform.includeCurrencies}
                        includeSites={editSearchInform.includeSites}
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
            </>
        );
    };
};

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { editContactInform, titleDetail, contactInforms, contactInformSettings, gridParams, editSearchInform, searchInforms, allSettings, resultUpdateContactInforms, resultUpdateSearchInforms} = state;
    return { editContactInform,titleDetail, contactInforms, contactInformSettings, gridParams, editSearchInform, searchInforms, allSettings, resultUpdateContactInforms, resultUpdateSearchInforms };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
