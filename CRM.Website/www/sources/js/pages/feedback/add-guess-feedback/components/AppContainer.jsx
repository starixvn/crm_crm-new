import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import PropTypes from 'prop-types';
import DataGrid from "./DataGrid";

class AppContainer extends Component {
    static propTypes = {
        getAllSettings: PropTypes.func,
        getFeedbackSubjectTemplateByPagingIndex: PropTypes.func,
        getNumberOfFeedbackSubjectTemplate: PropTypes.func

    };

    static defaultProps = {
        getAllSettings: function () {
            // nothing
        },
        getFeedbackSubjectTemplateByPagingIndex: function () {
            // nothing
        },
        getNumberOfFeedbackSubjectTemplate: function () {
            // nothing
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            feedbackSubjectTemplateList: []
        };
    }
    
   
    componentDidMount(){
        this.props.getAllSettings();
        this.props.getNumberOfFeedbackSubjectTemplate().then(() => {
            if(!this.props.numberOfFeedbackSubjectTemplate || this.props.numberOfFeedbackSubjectTemplate !== null)
            {
               this.handleGetFeedbackSubjectTemplateByPagingIndex();
            }
        });
    }

    handleGetFeedbackSubjectTemplateByPagingIndex = () => {
        const maxFeedbackSubjectTemplateNumberOnLoad = 100000;
        const totalPage = Math.round(this.props.numberOfFeedbackSubjectTemplate / maxFeedbackSubjectTemplateNumberOnLoad + 0.5);
            for (var i = 1; i <= totalPage; i++) {
            this.props.getFeedbackSubjectTemplateByPagingIndex(i);
        }
    };

    render() {
        return (
               <DataGrid />
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators( ActionCreators, dispatch );

const mapStateToProps = state => {
    const { settings, numberOfFeedbackSubjectTemplate, feedbackSubjectTemplateByPagingIndex } = state;
    return {
        settings,
        numberOfFeedbackSubjectTemplate,
        feedbackSubjectTemplateByPagingIndex
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( AppContainer );