import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Form, Row, Col } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import RenderExportExcel from '@jsroot/components/RenderExportExcel';

export class FilterEditInforms extends PureComponent {

    renderOptions = (name, id, key) => <option key={key} value={id}>{name}</option>;

    render() {
        const { values, touched, errors, handleChange, setFieldValue, handleSubmit,
            titleDetail, allSettings, gridParams, exportEditInforms, changeIsSubmit
        } = this.props;

        const allPositions = [
            { id: 4, name: 'Super' }, { id: 3, name: 'Master' },
            { id: 2, name: 'Agent' },{ id: 1, name: 'Member' },
            { id: 0, name: 'Guest' }
        ];

        const allIsVip = [
            { id: 2, name: 'All' }, { id: 1, name: 'Yes' },
            { id: 0, name: 'No' }
        ];

        const filterCurrencies = allSettings.currencies.map(item => {
            return {
                id: item.id,
                name: item.name,
                checked: values.currencyId.split(',').includes(item.id.toString())
            };
        });

        const filterLevels = allPositions.map(item => {
            return {
                id: item.id,
                name: item.name,
                checked: values.levelId.split(',').includes(item.id.toString())
            };
        });

        const filterSites = allSettings.sites[0].childSites.map(item => {
            return {
                id: item.id,
                name: item.name,
                checked: values.siteId.split(',').includes(item.id.toString())
            };
        });

        return (
            <>
                <Form className="form-filter">
                    <Form.Group as={Row}>
                        <Col sm="12" md="12" className="group-input-excel">
                            <Form.Control type="text" size="sm" className="shadow-none input-excel"
                                autoComplete="off"
                                name="username"
                                defaultValue={titleDetail.title}
                                onChange={event => {
                                    setFieldValue('title', event.target.value);
                                }}
                            />
                        <RenderExportExcel
                            gridParams={gridParams}
                            exportExcel={exportEditInforms}
                        />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label className="col-form-label" style={{paddingLeft:'15px'}}>
                            {LangHelper.getResource('Currency')}
                        </Form.Label>

                        <Col sm="2" md="2">
                            <MultipleSelect
                                isInvalid={touched.currencyId && errors.currencyId}
                                dataSource={filterCurrencies}
                                keyField='id' valueField='name'
                                hasAllOption={filterCurrencies.length > 0}
                                isAllTextShown={filterCurrencies.length > 0}
                                hasSearchBox
                                onChange={(currentItem, selectedItemsKey) => {
                                    setFieldValue('currencyId', selectedItemsKey);
                                }}
                            />
                        </Col>

                        <Form.Label className="col-form-label" style={{paddingLeft:'15px'}}>
                            {LangHelper.getResource('Position')}
                        </Form.Label>

                        <Col sm="2" md="2">
                            <MultipleSelect
                                isInvalid={touched.levelId && errors.levelId}
                                dataSource={filterLevels}
                                keyField='id' valueField='name'
                                hasAllOption={filterLevels.length > 0}
                                isAllTextShown={filterLevels.length > 0}
                                hasSearchBox
                                onChange={(currentItem, selectedItemsKey) => {
                                    setFieldValue('levelId', selectedItemsKey);
                                }}
                            />
                        </Col>

                        <Form.Label className="col-form-label" style={{paddingLeft:'15px'}}>
                            {LangHelper.getResource('Site')}
                        </Form.Label>

                        <Col sm="2" md="2">
                            <MultipleSelect
                                isInvalid={touched.siteId && errors.siteId}
                                dataSource={filterSites}
                                keyField='id' valueField='name'
                                hasAllOption={filterSites.length > 0}
                                isAllTextShown={filterSites.length > 0}
                                hasSearchBox
                                onChange={(currentItem, selectedItemsKey) => {
                                    setFieldValue('siteId', selectedItemsKey);
                                }}
                            />
                        </Col>

                        <Form.Label className="col-form-label" style={{paddingLeft:'15px'}}>
                            {LangHelper.getResource('VIP')}
                        </Form.Label>

                        <Col sm="1" md="1">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                name="vipId"
                                defaultValue={titleDetail.isVip}
                                key={titleDetail.isVip}
                                onChange={handleChange}
                            >
                                {
                                    allIsVip.map((value, key) => this.renderOptions(value.name, value.id, key))
                                }
                            </Form.Control>
                        </Col>

                        <Col sm="1" md="1" >
                            <Button variant="primary" size="sm" style={{width: '65px'}}
                                type="submit"
                                onClick={() => setFieldValue('submit',false)}
                            >
                                {LangHelper.getResource('Search')}
                            </Button>
                        </Col>

                    </Form.Group>

                    <Form.Group as={Row} style={{alignItems:'center'}}>
                        <Form.Label className="col-form-label" style={{paddingLeft:'15px'}}>
                            {LangHelper.getResource('DirectAccount')}
                        </Form.Label>

                        <Form.Check type="checkbox" className="check-btn"
                            checked={values.isHeadline}
                            onChange={event => setFieldValue('isHeadline', event.target.checked)}
                        />

                        <Form.Label className="col-form-label" style={{paddingLeft:'2px'}}>
                            {LangHelper.getResource('Headline')}
                        </Form.Label>

                        <Form.Check type="checkbox" className="check-btn"
                            checked={values.isNoGroup}
                            onChange={event => setFieldValue('isNoGroup', event.target.checked)}
                        />

                        <Form.Label className="col-form-label" style={{paddingLeft:'2px'}}>
                            {LangHelper.getResource('WithoutAnyGroup')}
                        </Form.Label>

                        <Form.Check type="checkbox" className="check-btn"
                            checked={values.isExcludeIgnoredAccounts}
                            onChange={event => setFieldValue('isExcludeIgnoredAccounts', event.target.checked)}
                        />

                        <Form.Label className="col-form-label" style={{paddingLeft:'2px'}}>
                            {LangHelper.getResource('ExcludeIgnoredAccounts')}
                        </Form.Label>
                    </Form.Group>
                </Form>
            </>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { titleDetail, allSettings, editDataInforms, gridParams, resultEditInforms } = state;
    return { titleDetail, allSettings, editDataInforms, gridParams, resultEditInforms };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterEditInforms);
