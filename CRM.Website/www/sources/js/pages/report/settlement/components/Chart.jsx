import colors from '@jsroot/common/colorColumnChart';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import React, { PureComponent } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from 'recharts';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

export class Chart extends PureComponent {
    constructor(props) {
        super(props);
    }

    convertDataChart = reports => {
        const data = reports.map(item => {
            const obj = { name: item.name };
            item.childReports.map(report => {
                if (obj[report.name]) {
                    obj[report.name] += report.numberOfIssues;
                } else {
                    obj[report.name] = report.numberOfIssues;
                }
            });
            return obj;
        });
        return data;
    };

    getLabels = reports => {
        const labels = [];
        reports.forEach(report => {
            report.childReports.forEach(item => {
                const index = labels.findIndex(label => label === item.name);
                if (index === -1) {
                    labels.push(item.name);
                }
            });
        });
        return labels;
    };

    onCloseChart = () => {
        this.props.setChartPopup({ show: false });
    };

    render() {
        const { chartInfo } = this.props.gridData;
        const data = this.convertDataChart(chartInfo.childReports);
        const labels = this.getLabels(chartInfo.childReports);
        return (
            <Modal className='settlement-modal-chart' show dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} size="xl"
                onHide={this.onCloseChart}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{chartInfo.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <BarChart
                        width={1000}
                        height={750}
                        data={data}
                        margin={{
                            top: 30, right: 30, left: 30, bottom: 50
                        }}
                        barCategoryGap={2}
                        barGap={2}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis label={{ value: 'Issue(s)', position: 'top', dy: -10 }} domain={[0, 'dataMax']} allowDecimals={false} />
                        <Legend wrapperStyle={{ bottom: 5, left: 75 }} />
                        {labels.map((label, index) => (
                            <Bar dataKey={label} key={index} label={{ position: 'top' }}
                                fill={colors[index % 20]}
                            />
                        )
                        )}
                    </BarChart>
                </Modal.Body>
            </Modal>
        );
    }
}
const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        gridData
    } = state;
    return {
        gridData
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chart);