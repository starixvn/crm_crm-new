import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import LangHelper from '@jsroot/common/langHelper';

export class OptionsEdit extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('click', this.handleOutSideClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleOutSideClick);
    }

    handleOutSideClick = event => {
        const { target } = event;
        if(this.wrapperRef && !this.wrapperRef.current.contains(target)){
            this.props.setShowOptions({show: false});
        }
    };

    handleEditSearch = titleId =>{
        this.props.setShowOptions({show: false});
        this.props.setShowEditSearchInform({show: true, titleId: titleId});
    };

    handleRemovedAccountLogs = titleId =>{
        const params = {
            titleId: titleId,
            pageIndex: 1,
            pageSize: 100
        };
        this.props.setShowOptions({show: false});
        this.props.setGridParamRemovedLogs(params);
        this.props.getRemovedAccountLogs(params);
        this.props.setShowRemovedLogs({show: true});
    };

    handleCloseCase = titleId =>{
        const params = {
            titleId: titleId,
            statusType: true
        };
        this.props.setShowOptions({show: false});
        this.props.updateInformStatus(params);
        this.props.getInforms();
    };

    handleOpenCase = titleId =>{
        const params = {
            titleId: titleId,
            statusType: false
        };
        this.props.setShowOptions({show: false});
        this.props.updateInformStatus(params);
        this.props.getInforms();
    };

    render() {
        const { showOption, top, left, status, titleIdSearch } = this.props.showOptions;

        return (
            <div ref={this.wrapperRef} id="contextMenu" className="dropdown clearfix">
                <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu" style={{display: showOption, top: top+15, left: left, position: 'fixed'}}>
                    {
                        status === 'Open' && (
                            <>
                                <li onClick={() => this.handleEditSearch(titleIdSearch)}>
                                    <div className="edit-menu-item">
                                        <i className="fa fa-pencil-square-o" style={{color: '#0789d1'}}></i>
                                        {LangHelper.getResource('EditNumberOfAccounts')}
                                    </div>      
                                </li>
                                <li className="divider"></li>
                                <li onClick={() => this.handleRemovedAccountLogs(titleIdSearch)}>
                                    <div className="edit-menu-item">
                                        <i className="fa fa-list-alt" style={{color: '#0789d1'}}></i>
                                        {LangHelper.getResource('RemovedEditedAccountsLogs')}
                                    </div>
                                </li>
                                <li className="divider" ></li>
                                <li onClick={() => this.handleCloseCase(titleIdSearch)}>
                                    <div className="edit-menu-item">
                                        <i className="fa fa-times" style={{color: '#de5144'}}></i>
                                        {LangHelper.getResource('CloseCase')}
                                    </div>
                                </li>
                            </>
                        )
                    }
                    {
                        status === 'Closed' && (
                            <>
                                <li onClick={() => this.handleOpenCase(titleIdSearch)}>
                                    <div className="edit-menu-item">
                                        <i className="fa fa-folder-open" style={{color: '#cabc04'}}></i>
                                        {LangHelper.getResource('OpenCase')}
                                    </div>
                                </li>
                                <li className="divider" ></li>
                                <li onClick={() => this.handleRemovedAccountLogs(titleIdSearch)}>
                                    <div className="edit-menu-item">
                                        <i className="fa fa-list-alt" style={{color: '#0789d1'}}></i>
                                        {LangHelper.getResource('RemovedEditedAccountsLogs')}
                                    </div>
                                </li>
                            </>
                        )
                    }
                </ul>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { showOptions } = state;
    return { showOptions };
};

export default connect(mapStateToProps, mapDispatchToProps)(OptionsEdit);
