import React, { PureComponent } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import MultipleSelect from '@jsroot/components/multiple-select/index';

export class FilterSearchInforms extends PureComponent {   
    renderOptions = (name, id, key) => <option key={key} value={id}>{name}</option>;

    render() {
        const { values, touched, errors, handleChange, setFieldValue, handleSubmit,
            titleDetail, filterCurrencies, filterLevels, filterSites, allIsVip, renderExportExcelText
        } = this.props;

        return (
            <>
                <Form className="form-filter">
                    <Form.Group as={Row}>
                        <Col sm="11" md="11">
                            <Form.Control type="text" size="sm" className="shadow-none"
                                autoComplete="off"
                                name="username"
                                defaultValue={titleDetail.title}
                                onChange={(event) => {
                                    setFieldValue('title', event.target.value)
                                }}
                            />
                        </Col>

                        <Col sm="1" md="1">
                            {renderExportExcelText()}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label className="col-form-label" style={{"paddingLeft":"15px"}}>
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

                        <Form.Label className="col-form-label" style={{"paddingLeft":"15px"}}>
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

                        <Form.Label className="col-form-label" style={{"paddingLeft":"15px"}}>
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

                        <Form.Label className="col-form-label" style={{"paddingLeft":"15px"}}>
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
                                onClick={() => {
                                    setFieldValue('submit',false);
                                    handleSubmit;
                                }}
                            >
                                {LangHelper.getResource('Search')}
                            </Button>
                        </Col>

                    </Form.Group>

                    <Form.Group as={Row} style={{"alignItems":"center"}}>
                        <Form.Label className="col-form-label" style={{"paddingLeft":"15px"}}>
                            {LangHelper.getResource('DirectAccount')}
                        </Form.Label>

                        <Form.Check type="checkbox" className="check-btn"
                            checked={values.isHeadline}
                            onChange={event => setFieldValue('isHeadline', event.target.checked)}
                        />

                        <Form.Label className="col-form-label" style={{"paddingLeft":"2px"}}>
                            {LangHelper.getResource('Headline')}
                        </Form.Label>

                        <Form.Check type="checkbox" className="check-btn"
                            checked={values.isNoGroup}
                            onChange={event => setFieldValue('isNoGroup', event.target.checked)}
                        />

                        <Form.Label className="col-form-label" style={{"paddingLeft":"2px"}}>
                            {LangHelper.getResource('WithoutAnyGroup')}
                        </Form.Label>

                        <Form.Check type="checkbox" className="check-btn"
                            checked={values.isExcludeIgnoredAccounts}
                            onChange={event => setFieldValue('isExcludeIgnoredAccounts', event.target.checked)}
                        />

                        <Form.Label className="col-form-label" style={{"paddingLeft":"2px"}}>
                            {LangHelper.getResource('ExcludeIgnoredAccounts')}
                        </Form.Label>
                    </Form.Group>
                </Form>
            </>
        );
    };
}

export default FilterSearchInforms
