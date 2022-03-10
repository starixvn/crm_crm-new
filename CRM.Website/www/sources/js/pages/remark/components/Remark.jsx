import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Form, Row, Collapse, Button } from 'react-bootstrap';
import CkEditor from '@jsroot/components/ckeditor/index';
import LangHelper from '@jsroot/common/langHelper';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import Site from '@jsroot/common/site';
import { Policy } from '@jsroot/common/constants';

export class Remark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: {
                specialRemark: false,
                normalRemark: false
            },
            isSubmitting: false,
            editRemarkResult: null,
            specialRemarks: [],
            dataSpecialRemarks: [],
            normalRemarks: [],
            dataNormalRemarks: []
        };
    }

    async componentDidMount() {
        await this.props.getRemarks({
            customerId: this.props.id
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
        this.setState(prevState => ({
            specialRemarks: [...prevState.specialRemarks.filter((item,i) => i !== index)],
            dataSpecialRemarks: [...prevState.dataSpecialRemarks.filter((item,i) => i !== index)]
        }));
    };

    removeNormalRemarkItem = index => {
        this.setState(prevState => ({
            normalRemarks: [...prevState.normalRemarks.filter((item,i) => i !== index)],
            dataNormalRemarks: [...prevState.dataNormalRemarks.filter((item,i) => i !== index)]
        }));
    };

    addSpecialRemarkItem = item => {
        const { dataSpecialRemarks } = this.state;
        if (dataSpecialRemarks[dataSpecialRemarks.length - 1] !== '') {
            this.setState(prevState => ({
                specialRemarks: [...prevState.specialRemarks, item]
            }));
        }
    };

    addNormalRemarkItem = item => {
        const { dataNormalRemarks } = this.state;
        if (dataNormalRemarks[dataNormalRemarks.length - 1] !== '') {
            this.setState(prevState => ({
                normalRemarks: [...prevState.normalRemarks, item]
            }));
        }
    };

    handleSubmit = () => {
        this.setState({ isSubmitting: true });
        const id = this.props.id; 
        const params = {
            customerId: id,
            specialRemarks: this.state.dataSpecialRemarks,
            normalRemarks: this.state.dataNormalRemarks
        };
        Site.blockUI();
        this.props.editRemarks(params).then(response => {
            Site.unblockUI();
            this.setState({ editRemarkResult: response.data });
            if (response.data.isSuccessful) {
                setTimeout(async () => {
                    this.setState({ editRemarkResult: null });
                    await this.props.getRemarks({ customerId: id });
                    this.setState({
                        isSubmitting: false,
                        specialRemarks: [...this.props.gridData.specialRemarks,''],
                        normalRemarks: [...this.props.gridData.normalRemarks,'']
                    });
                }, 3000);
            } else {
                this.setState({ isSubmitting: false });
            }
        });
    };

    render() {
        const { collapse, specialRemarks, dataSpecialRemarks, normalRemarks, dataNormalRemarks, editRemarkResult
        } = this.state;
        const canEditRemark = window.customerInfoPolicy === Policy.Host;
        if (this.props.gridData === null){
            return null;
        }

        return (
            <div>
                {
                    editRemarkResult &&
                    <ResponseMessage isSuccessful={editRemarkResult.isSuccessful}
                        message={editRemarkResult.message || LangHelper.getResource('UpdateRemarkSuccessfully')}
                    />
                }
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
                                        <span className={index + 1 === specialRemarks.length ? 'opacity' : ''}>{index + 1}.</span>
                                        <CkEditor data={dataSpecialRemarks[index]} username={window.currentUsername}
                                            onChange={value => this.handleChange(value, index, 'dataSpecialRemarks', dataSpecialRemarks)}
                                        />
                                        {
                                            canEditRemark && (
                                                (index + 1)  === specialRemarks.length ?
                                                <span className="plus-icon fa fa-plus" onClick={() => this.addSpecialRemarkItem(index+item)}/>
                                                : <span className="cross-icon fa fa-times" onClick={() => this.removeSpecialRemarkItem(index)} />
                                            )
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
                                        <span className={index + 1 === normalRemarks.length ? 'opacity' : ''}>{index + 1}.</span>
                                        <CkEditor data={dataNormalRemarks[index]} username={window.currentUsername}
                                            onChange={value => this.handleChange(value, index, 'dataNormalRemarks', dataNormalRemarks)}
                                        />
                                        {
                                            canEditRemark && (
                                                (index + 1)  === normalRemarks.length ?
                                                <span className="plus-icon fa fa-plus" onClick={() => this.addNormalRemarkItem(index+item)}/>
                                                : <span className="cross-icon fa fa-times" onClick={() => this.removeNormalRemarkItem(index)} />
                                            )
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </Collapse>
                </div>
                {
                    canEditRemark && (
                        <Button type="submit" className="mt-3" variant="primary" size="sm" onClick={this.handleSubmit} disabled={this.state.isSubmitting}>
                            {LangHelper.getResource('Save')}
                        </Button>
                    )
                }
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
