import React, { Component, Fragment } from 'react';
import { Form, Row } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import CkEditor from '@jsroot/components/ckeditor/index';
import Select from '@jsroot/components/CustomReactSelect';

export default class RemarkInfo extends Component {
    handleChangeSelect = (value, setFieldValue, name) =>{
      if(value !== null){
        setFieldValue(name, value.value);
      }else{
        setFieldValue(name, '');
      }
  };

  render() {
    const { touched, errors, values, handleChange, setFieldValue,
            remarkTitles, relatedPicsOption, allSettings, isValidCustomer } = this.props;
    const userOptions = allSettings.users.map(item => {
        return {
            value: item.userId,
            label: item.username
        };
    });
    const extentionOptions = allSettings.extentions.map(item => {
        return {
            value: item.id,
            label: item.value
        };
    });
    const approvedByDefault = userOptions.filter(x=> x.value === parseInt(values.approvedBy, 10));
    const handledByDefault = userOptions.filter(x=> x.value === parseInt(values.handledBy, 10));
    const acknowledgedByDefault = userOptions.filter(x=> x.value === parseInt(values.acknowledgedBy, 10));
    const extentionDefault = extentionOptions.filter(x=> x.value === parseInt(values.extStation, 10));
    return (
      <Fragment>
          <Form.Group as={Row}>
                <Form.Label className='pr-4 ml-4 col-form-label required' htmlFor="remarkTitle">
                    {LangHelper.getResource('RemarkTitle')}
                </Form.Label>
                <div className='width-multiple-select'>
                    <Form.Control as="select" size="sm" className="shadow-none"
                        isInvalid={touched.remarkTitle && errors.remarkTitle}
                        name="remarkTitle" id="remarkTitle"
                        disabled={!isValidCustomer}
                        onChange={handleChange}
                        value={values.remarkTitle}
                    >
                        <option value="">{LangHelper.getResource('PleaseSelect')}</option>
                        {remarkTitles.map((value, key) => <option key={key} value={value.settingId}>{value.settingValue}</option>)}
                    </Form.Control>
                </div>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label htmlFor="relatedPics" className='pr-4 ml-4 col-form-label'>
                    {LangHelper.getResource('RelatedToPICs')}
                </Form.Label>
                <div className='width-multiple-select'>
                    <MultipleSelect
                        id="relatedPics"
                        name="relatedPics"
                        isDisable={!isValidCustomer}
                        keyField='picID'
                        isAllTextShown={relatedPicsOption.length > 0}
                        hasSearchBox
                        dataSource={relatedPicsOption}
                        valueField='username'
                        statusField='checked'
                        maxDisplayItemCount={1}
                        onChange={(currentItem, selectedItemsKey) => {
                            setFieldValue('relatedPics', selectedItemsKey);
                        }}
                    />
                </div>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label className='pr-4 ml-4 col-form-label' htmlFor="requestedBy">
                    {LangHelper.getResource('RequestedBy')}
                </Form.Label>
                <div style={{width: 150, marginRight: 26}}>
                    <Form.Control size="sm" type="text"
                        name="requestedBy" id="requestedBy"
                        className='shadow-none'
                        value={values.requestedBy}
                        autoComplete="off"
                        isInvalid={touched.requestedBy && errors.requestedBy}
                        onChange={handleChange}
                    />
                </div>
                <Form.Label htmlFor="approvedBy" className='pr-2 ml-2 col-form-label small-label-width'>
                    {LangHelper.getResource('ApprovedBy')}
                </Form.Label>
                <div style={{width: 150, marginRight: 26}}>
                    <Select
                        placeholder={LangHelper.getResource('PleaseSelect')}
                        isClearable
                        isSearchable
                        defaultValue={approvedByDefault}
                        noOptionsMessage={() => LangHelper.getResource('NoResultFound')}
                        onChange={value => this.handleChangeSelect(value, setFieldValue, 'approvedBy')}
                        options={userOptions}
                        value={values.userId}
                    />
                </div>
                <Form.Label htmlFor="acknowledgedBy" className='pr-2 col-form-label'>
                    {LangHelper.getResource('AcknowledgedBy')}
                </Form.Label>
                <div style={{width: 150}}>
                    <Select
                        placeholder={LangHelper.getResource('PleaseSelect')}
                        isClearable
                        isSearchable
                        defaultValue={acknowledgedByDefault}
                        noOptionsMessage={() => LangHelper.getResource('NoResultFound')}
                        onChange={value => this.handleChangeSelect(value, setFieldValue, 'acknowledgedBy')}
                        options={userOptions}
                        value={values.userId}
                    />
                </div>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label className='pr-4 ml-4 col-form-label' htmlFor="handledBy">
                    {LangHelper.getResource('HandledBy')}
                </Form.Label>
                <div style={{width: 150, marginRight: 26}}>
                    <Select
                        placeholder={LangHelper.getResource('PleaseSelect')}
                        isClearable
                        isSearchable
                        defaultValue={handledByDefault}
                        noOptionsMessage={() => LangHelper.getResource('NoResultFound')}
                        onChange={value => this.handleChangeSelect(value, setFieldValue, 'handledBy')}
                        options={userOptions}
                        value={values.userId}
                    />
                </div>
                <Form.Label className='pr-2 ml-2 col-form-label small-label-width' htmlFor="extStation">
                    {LangHelper.getResource('ExtStation')}
                </Form.Label>
                <div style={{width: 150}}>
                    <Select
                        placeholder={LangHelper.getResource('PleaseSelect')}
                        isClearable
                        isSearchable
                        defaultValue={extentionDefault}
                        noOptionsMessage={() => LangHelper.getResource('NoResultFound')}
                        onChange={value => this.handleChangeSelect(value, setFieldValue, 'extStation')}
                        options={extentionOptions}
                        value={values.id}
                    />
                </div>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label className='pr-4 ml-4 col-form-label required'>
                        {LangHelper.getResource('RemarkContent')}
                </Form.Label>
            </Form.Group>
            <div className={!isValidCustomer ? 'disable-content' : ''}>
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