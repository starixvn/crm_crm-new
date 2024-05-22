import React, { Component } from 'react';
import LangHelper from '@jsroot/common/langHelper';
import { Col, Form, Row, Tabs, Tab } from 'react-bootstrap';
import CkEditor from '@jsroot/components/ckeditor/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import UploadFile from './UploadFile';

export class ContentTab extends Component {
    handleCheckTypeLanguage = () => {
        document.getElementById("file-btn").value = "";
        this.props.setLanguageType(!this.props.isAllLanguages);
    };

    handleCheckAllLanguages = () => {
        document.getElementById("file-btn").value = "";
        this.props.setLanguageType(true);
    };

    handleCheckSingleLanguage = () => {
        document.getElementById("file-btn").value = "";
        this.props.setLanguageType(false);
    };

    render() {
    const {
        languages, handleChangeTab, tab, isValidContent, content, setFieldValue, isReadOnly = false, isChangeTemplate, parameters,
        values, handleChangeParameter, setStateUploadFile, uploadedFiles, invalidContentMaxLength, textInvalidContentMaxLength, actionParam
    } = this.props;
    return (
        <Form.Group as={Row}>
            {
                !isReadOnly &&
                <Form.Label column sm="2" md="2" className='required' htmlFor="content">
                    {LangHelper.getResource('Content')}
                </Form.Label>
            }
            <Col sm={isReadOnly ? '12' : '10'} md={isReadOnly ? '12' : '10'}>
                <Tabs
                    className='languages-text'
                    id="controlled-tab"
                    activeKey={tab}
                    onSelect={selected => handleChangeTab(selected)}
                >
                    {
                        languages.map((language, key) =>
                            (<Tab key={key} eventKey={language.settingValue} title={language.settingValue}>
                                <CkEditor
                                    name={language.mapLabel}
                                    isInvalid={isValidContent}
                                    data={content[language.mapLabel]}
                                    username={window.currentUsername}
                                    onChange={value => {
                                        setFieldValue(`content.${[language.mapLabel]}`, value);
                                        setFieldValue(`cloneContent.${[language.mapLabel]}`, value);
                                    }}
                                    isRemoveToolbarForChatbot
                                    readOnly={isReadOnly}
                                />
                                {
                                    isChangeTemplate && parameters &&
                                    <Form.Group as={Row}>
                                        <div style={{'margin-top': '8px'}} className='group-list'>
                                            <div className='list-title'>Parameters</div>
                                            <div className="list-info">
                                                {
                                                    parameters.map((param, index) => {
                                                        const removeSpaceParam = param.replace(/\s+/g, "");
                                                        return (
                                                            <div key={index} className='d-flex box-param'>
                                                                <div className='param pt-1'>{param}</div>
                                                                <Form.Control as="textarea" value={values[removeSpaceParam] || ''}
                                                                    name={removeSpaceParam} id={removeSpaceParam}
                                                                    className="shadow-none form-input-param" autoComplete="off"
                                                                    onChange={event => handleChangeParameter(event, param, parameters)}
                                                                />
                                                            </div>
                                                        );
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </Form.Group>
                                }
                                <UploadFile id={actionParam?.announcementId} setStateUploadFile={setStateUploadFile}
                                    uploadedFiles={uploadedFiles} languageKey={language.mapLabel} invalidContentMaxLength={invalidContentMaxLength}
                                    textInvalidContentMaxLength={textInvalidContentMaxLength} isAllLanguages={this.props.isAllLanguages}
                                    handleCheckAllLanguages={this.handleCheckAllLanguages} handleCheckSingleLanguage={this.handleCheckSingleLanguage}
                                />
                            </Tab>)
                        )
                    }
                </Tabs>
            </Col>
        </Form.Group>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {isAllLanguages} = state;

    return {isAllLanguages};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentTab);