import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import Chart from './Chart';
import DataGrid from './DataGrid';
import Filter from './Filter';

export class AppContainer extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <Filter />
                <DataGrid />
                {
                    this.props.contentChartPopup?.show && <Chart />
                }
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    const {
        contentChartPopup
    } = state;
    return {
        contentChartPopup
    };
};

export default connect(mapStateToProps)(AppContainer);