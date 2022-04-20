import React, { Component, Fragment } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import CkEditor from '@jsroot/components/ckeditor/index';

export default class RemarkInfo extends Component {
  render() {
    const { touched, errors, values, handleChange, setFieldValue,
            remarkTitles, relatedPicsOption, allSettings, isValidUsername } = this.props;

    return (
      <Fragment>
          <Form.Group as={Row}>
                <Form.Label column sm="2" md="2" className="required" htmlFor="remarkTitle">
                    {LangHelper.getResource('RemarkTitle')}
                </Form.Label>
                <Col sm="10" md="10">
                    <Form.Control as="select" size="sm" className="shadow-none"
                        isInvalid={touched.remarkTitle && errors.remarkTitle}
                        name="remarkTitle" id="remarkTitle"
                        disabled={!isValidUsername}
                        onChange={handleChange}
                        value={values.remarkTitle}
                    >
                        <option value="">{LangHelper.getResource('PleaseSelect')}</option>
                        {remarkTitles.map((value, key) => <option key={key} value={value.settingId}>{value.settingValue}</option>)}
                    </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="2" md="2" htmlFor="relatedToPICs">
                    {LangHelper.getResource('RelatedToPICs')}
                </Form.Label>
                <Col sm="10" md="10">
                    <MultipleSelect
                        id="relatedToPICs"
                        name="relatedToPICs"
                        isDisable={!isValidUsername}
                        keyField='id'
                        isAllTextShown
                        hasSearchBox
                        dataSource={relatedPicsOption}
                        valueField='name'
                        statusField='checked'
                        onChange={(currentItem, selectedItemsKey) => {
                            handleChange('relatedPics')(selectedItemsKey);
                        }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="2" md="2" htmlFor="requestedBy">
                    {LangHelper.getResource('RequestedBy')}
                </Form.Label>
                <Col sm="2" md="2">
                    <Form.Control size="sm" type="text"
                        name="requestedBy" id="requestedBy"
                        className='shadow-none'
                        value={values.requestedBy}
                        autoComplete="off"
                        isInvalid={touched.requestedBy && errors.requestedBy}
                        onChange={handleChange}
                    /> 
                </Col>
                <Form.Label column sm="2" md="2" htmlFor="approvedBy">
                    {LangHelper.getResource('ApprovedBy')}
                </Form.Label>
                <Col sm="2" md="2">
                    <Form.Control as="select" size="sm" className="shadow-none"
                        isInvalid={touched.approvedBy && errors.approvedBy}
                        name="approvedBy" id="approvedBy"
                        onChange={handleChange}
                        value={values.approvedBy}
                    >
                        <option value="" disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                        {allSettings.users.map((value, key) => <option key={key} value={value.userId}>{value.username}</option>)}
                    </Form.Control>
                </Col>
                <Form.Label column sm="2" md="2" htmlFor="acknowledgedBy">
                    {LangHelper.getResource('AcknowledgedBy')}
                </Form.Label>
                <Col sm="2" md="2">
                    <Form.Control as="select" size="sm" className="shadow-none"
                        isInvalid={touched.acknowledgedBy && errors.acknowledgedBy}
                        onChange={handleChange}
                        name="acknowledgedBy" id="acknowledgedBy"
                        value={values.acknowledgedBy}
                    >
                        <option value="" disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                        {allSettings.users.map((value, key) => <option key={key} value={value.userId}>{value.username}</option>)}
                    </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="2" md="2" htmlFor="handledBy">
                    {LangHelper.getResource('HandledBy')}
                </Form.Label>
                <Col sm="2" md="2">
                <Form.Control as="select" size="sm" className="shadow-none"
                    isInvalid={touched.handledBy && errors.handledBy}
                    name="handledBy" id="handledBy"
                    onChange={handleChange}
                    value={values.handledBy}
                >
                    <option value="" disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                    {allSettings.users.map((value, key) => <option key={key} value={value.userId}>{value.username}</option>)}
                </Form.Control>
                </Col>
                <Form.Label column sm="2" md="2" htmlFor="extStation">
                    {LangHelper.getResource('ExtStation')}
                </Form.Label>
                <Col sm="2" md="2">
                    <Form.Control as="select" size="sm" className="shadow-none"
                        isInvalid={touched.extStation && errors.extStation}
                        name="extStation" id="extStation"
                        onChange={handleChange}
                        value={values.extStation}
                    >
                        <option value="" disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                        {allSettings.extentions.map((value, key) => <option key={key} value={value.id}>{value.value}</option>)}
                    </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="12" md="12" className="required">
                        {LangHelper.getResource('RemarkContent')}
                </Form.Label>
            </Form.Group>
            <div className={!isValidUsername ? 'disable-content' : ''}>
                <CkEditor
                    name='remarkContent'
                    isInvalid={touched.remarkContent && errors.remarkContent}
                    data={values.remarkContent}
                    username={window.currentUsername}
                    onChange={value => setFieldValue('remarkContent', value)}
                />
            </div>
      </Fragment>
    );
  }
}