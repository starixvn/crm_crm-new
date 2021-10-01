import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Form, Row, Collapse } from 'react-bootstrap';
import CkEditor from '@jsroot/components/ckeditor/index';
import LangHelper from '@jsroot/common/langHelper';

export class Remark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: {
                specialRemark: false,
                normalRemark: false
            },
            specialRemarks: [],
            dataSpecialRemarks: [],
            normalRemarks: [],
            dataNormalRemarks: []
        }
    }

    async componentDidMount() {
        await this.props.getRemarks({
            customerId: 1754
        });
        const { gridData } = this.props;
        this.setState({
            specialRemarks: [...gridData.specialRemarks,''],
            dataSpecialRemarks: [...gridData.specialRemarks,''],
            normalRemarks: [...gridData.normalRemarks,''],
            dataNormalRemarks: [...gridData.normalRemarks,'']
        });
    }

    handleChange = (value, key, name, dataRemark) => {
        const newDataRemark = [...dataRemark];
        newDataRemark[key] = value;

        this.setState({
            [name]: newDataRemark
        });
    };

    handleCollapseExpand = (section = '') => {
        this.setState(prevState => ({
            collapse: { ...prevState.collapse, [section]: !prevState.collapse[section] }
        }));
    };

    removeSpecialRemarkItem = index => {
        const { specialRemarks, dataSpecialRemarks } = this.state;
        this.setState({
            specialRemarks: [...specialRemarks].filter((item,i) => i !== index),
            dataSpecialRemarks: [...dataSpecialRemarks].filter((item,i) => i !== index)
        });
    };

    removeNormalRemarkItem = index => {
        const { normalRemarks, dataNormalRemarks } = this.state;
        this.setState({
            normalRemarks: [...normalRemarks].filter((item,i) => i !== index),
            dataNormalRemarks: [...dataNormalRemarks].filter((item,i) => i !== index)
        });
    };

    addSpecialRemarkItem = item => {
        const { specialRemarks, dataSpecialRemarks } = this.state;
        if (dataSpecialRemarks[dataSpecialRemarks.length - 1] !== '') {
            this.setState({
                specialRemarks: [...specialRemarks, item]
            });
        }
    };

    addNormalRemarkItem = item => {
        const { normalRemarks, dataNormalRemarks } = this.state;
        if (dataNormalRemarks[dataNormalRemarks.length - 1] !== '') {
            this.setState({
                normalRemarks: [...normalRemarks, item]
            });
        }
    };

    render() {
        const { collapse, specialRemarks, dataSpecialRemarks, normalRemarks, dataNormalRemarks } = this.state;
        const { gridData } = this.props;
        if (gridData === null){
            return null;
        }

        return (
            <div>
                <div className="panel-group mb-3">
                    <Form.Group as={Row} className="panel-title"
                        aria-expanded={!collapse.specialRemark}
                        aria-controls="collapse-expand-specialRemark"
                        onClick={() => this.handleCollapseExpand('specialRemark')}
                    >
                        <Form.Label className="required">{LangHelper.getResource('SpecialRemark')}</Form.Label>
                    </Form.Group>
                    <Collapse in={!collapse.specialRemark}>
                        <div className="panel-content" id="collapse-expand-specialRemark">
                            {
                                specialRemarks.map((item, index) => (                                   
                                    <div className="generate-remark" key={`${item}-${index}`}>
                                        <span>{index + 1}.</span>
                                        <CkEditor data={dataSpecialRemarks[index]} username={window.currentUsername}
                                            onChange={value => this.handleChange(value, index, 'dataSpecialRemarks', dataSpecialRemarks)}
                                        />
                                        {
                                            (index + 1)  === specialRemarks.length ?
                                            <span className="plus-icon fa fa-plus" onClick={() => this.addSpecialRemarkItem(index+item)}/>
                                            : <span className="cross-icon fa fa-times" onClick={() => this.removeSpecialRemarkItem(index)} />
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </Collapse>
                </div>

                <div className="panel-group">
                    <Form.Group as={Row} className="panel-title"
                        aria-expanded={!collapse.normalRemark}
                        aria-controls="collapse-expand-normalRemark"
                        onClick={() => this.handleCollapseExpand('normalRemark')}
                    >
                        <Form.Label className="required">{LangHelper.getResource('Remark')}</Form.Label>
                    </Form.Group>
                    <Collapse in={!collapse.normalRemark}>
                        <div className="panel-content" id="collapse-expand-normalRemark">
                            {
                                normalRemarks.map((item, index) => (                                   
                                    <div className="generate-remark" key={`${item}-${index}`}>
                                        <span>{index + 1}.</span>
                                        <CkEditor data={dataNormalRemarks[index]} username={window.currentUsername}
                                            onChange={value => this.handleChange(value, index, 'dataNormalRemarks', dataNormalRemarks)}
                                        />
                                        {
                                            (index + 1)  === normalRemarks.length ?
                                            <span className="plus-icon fa fa-plus" onClick={() => this.addNormalRemarkItem(index+item)}/>
                                            : <span className="cross-icon fa fa-times" onClick={() => this.removeNormalRemarkItem(index)} />
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </Collapse>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridData } = state;
    return { gridData };
};

export default connect(mapStateToProps, mapDispatchToProps)(Remark);
