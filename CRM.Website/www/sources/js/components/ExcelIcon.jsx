import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function ExcelIcon(props) {
    return (
        <OverlayTrigger
            placement="auto"
            overlay={
                <Tooltip>
                    <span>Export to Excel</span>
                </Tooltip>
            }
        >
            <span className="fa fa-file-excel-o icon-excel cursor-pointer" onClick={props.handleExportExcel} />
        </OverlayTrigger>
    );
}

export default ExcelIcon;
