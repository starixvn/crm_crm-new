import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import Filter from './Filter';
import DataGrid from './DataGrid';
import EditNoOfInquiry from '../../feedback/edit-no-of-inquiry/AppContainer';

export class AppContainer extends Component {
    static propTypes = {
        editNoOfInquiryDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired
    };

    static defaultProps = {
        editNoOfInquiryDialog: { show: false }
    };

    handleCloseEditNoInquiryDialog = () => {
        this.props.setEditNoOfInquiryDialog({ show: false });
    };

    render() {
        const { editNoOfInquiryDialog } = this.props;
        return (
            <div className="col-md-10">
                <Filter/>
                <DataGrid/>
                {
                    editNoOfInquiryDialog.show &&
                    <EditNoOfInquiry feedbackId={editNoOfInquiryDialog.feedbackId}
                        onClose={this.handleCloseEditNoInquiryDialog}
                    />
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { editNoOfInquiryDialog } = state;
    return { editNoOfInquiryDialog };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
