import React, { Component } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export class ExcelIcon extends Component {
    render() {
        return (
            <OverlayTrigger
                placement="auto"
                overlay={
                    <Tooltip>
                        <span>Export to Excel</span>
                    </Tooltip>
                }
            >
                <span className="fa fa-file-excel-o icon-excel cursor-pointer" onClick={this.props.handleExportExcel} />
            </OverlayTrigger>
        )
    }
}

export default ExcelIcon;
