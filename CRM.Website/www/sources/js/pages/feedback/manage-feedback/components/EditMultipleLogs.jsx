import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Form, Row, OverlayTrigger, Tooltip, Collapse } from 'react-bootstrap';
import { Formik } from 'formik';
import moment from 'moment';
import { ActionCreators } from '../actions';
import DatePicker from '@jsroot/components/date-picker/index';
import CkEditor from '@jsroot/components/ckeditor/index';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import AutoComplete from '@jsroot/components/AutoComplete';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import Site from '@jsroot/common/site';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';
import PropTypes from 'prop-types';
import {
    getSubCategories, getSubProducts, getBetTypes, getSubjectOnChangeCategories,
    getProductParams, getCategoryParams, generateTimeAndToolPrefix
} from '@jsroot/common/shareScripts';

export class EditMultipleLogs extends Component {
    static propTypes = {
        feedbackArr: PropTypes.array.isRequired,
        onClose: PropTypes.func.isRequired
    };

    static defaultProps = {
        feedbackArr: [],
        onClose: function () {
            // nothing
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            feedbackArr: props.feedbackArr,
            editResult: null,
            isSubmitting: false,
            multipleLogs: null
        };
    }

    async componentDidMount() {
        const id = this.props.feedbackArr[0].feedbackId;
        const url = Site.resolveClientUrl(`Feedback/GetLogSettingByFeedbackId/${id}`);
        await DataService.getDataAsync(url).then(response => {
            this.setState({ multipleLogs: response.data});
        });
    }
    render() {
        return (
            <div>
                hello
            </div>
        );
    }
}

export default EditMultipleLogs;
