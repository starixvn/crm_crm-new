import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import DataGrid from './DataGrid';
import EditInformHeadlines from './EditInformHeadlines';

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

    handleCloseEditInformHeadlines = () => {
        this.props.getInforms();
        this.props.setEditInformHeadline({show: false});
    }

    render() {
        const { searchPolicy, contactPolicy, editInformHeadline, contactInformSettings } = this.props;

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
                    editInformHeadline.show &&
                    <EditInformHeadlines
                        titleId={editInformHeadline.titleId}
                        onClose={this.handleCloseEditInformHeadlines}
                        selectedStatuses={editInformHeadline.selectedStatuses}
                        titleDetail={this.props.titleDetail}
                        contactInforms={this.props.contactInforms}
                        contactInformSettings={this.props.contactInformSettings}
                        gridParams={this.props.gridParams}
                        getContactInforms={this.props.getContactInforms}
                        setGridParams={this.props.setGridParams}
                        getUpdateContentInforms={this.props.getUpdateContentInforms}
                    />
                }
            </>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { editInformHeadline,titleDetail ,contactInforms, contactInformSettings, gridParams} = state;
    return { editInformHeadline,titleDetail, contactInforms, contactInformSettings, gridParams };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
