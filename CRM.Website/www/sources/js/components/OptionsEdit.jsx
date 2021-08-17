import React, { PureComponent } from 'react'
import LangHelper from '@jsroot/common/langHelper';

export class OptionsEdit extends PureComponent {

    render() {
        const { showOption, top, left, status, titleIdSearch, handleEditSearch, handleRemovedAccountLogs, handleCloseCase, handleOpenCase } = this.props;

        return (
            <div id="contextMenu" className="dropdown clearfix">
                <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu" style={{display: showOption, top: top, left: left-16}}>
                    {
                        status === 'Open' && (
                            <>
                                <li onClick={() => handleEditSearch(titleIdSearch)}>
                                    <div class="edit-menu-item">
                                        <i className="fa fa-pencil-square-o" style={{color: '#0789d1'}}></i>
                                        {LangHelper.getResource('EditNumberOfAccounts')}
                                    </div>               
                                </li>
                                <li className="divider"></li>
                                <li onClick={() => handleRemovedAccountLogs(titleIdSearch)}>
                                    <div class="edit-menu-item">
                                        <i className="fa fa-list-alt" style={{color: '#0789d1'}}></i>
                                        {LangHelper.getResource('RemovedEditedAccountsLogs')}
                                    </div>
                                </li>
                                <li className="divider" ></li>
                                <li onClick={() => handleCloseCase(titleIdSearch)}>
                                    <div class="edit-menu-item">
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
                                <li onClick={() => handleOpenCase(titleIdSearch)}>
                                    <div class="edit-menu-item">
                                        <i className="fa fa-folder-open" style={{color: '#cabc04'}}></i>
                                        {LangHelper.getResource('OpenCase')}
                                    </div>
                                </li>
                                <li className="divider" ></li>
                                <li onClick={() => handleRemovedAccountLogs(titleIdSearch)}>
                                    <div class="edit-menu-item">
                                        <i className="fa fa-list-alt" style={{color: '#0789d1'}}></i>
                                        {LangHelper.getResource('RemovedEditedAccountsLogs')}
                                    </div>
                                </li>
                            </>
                        )
                    }
                </ul>
            </div>
        )
    }
}

export default OptionsEdit
