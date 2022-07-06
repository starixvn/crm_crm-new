import React, { Component } from 'react';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import { Modal } from 'react-bootstrap';
import { getBackGroundColor } from '@jsroot/common/shareScripts';
import { Bar, BarChart, Legend, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export class Chart extends Component {

    getDataChart = data => {
        const dataChart = [];
        data.childReports.map(item => {
            dataChart.push({ name: item.shortName, [item.shortName]: item.totalChildReports });
        });
        return dataChart;
    };

    getLabelChart = data => {
        const labelChart = [];
        data.childReports.map(item => {
            labelChart.push(item.shortName);
        });
        return labelChart;
    };

    render() {
        const { chartInfo } = this.props;
        const data = this.getDataChart(chartInfo);
        const labels = this.getLabelChart(chartInfo);

        return (
            <Modal className='chart-modal-dynamic' show dialogAs={DraggableModalDialog}
                onHide={this.props.onClose} backdrop="static" keyboard={false} size="xl"
            >
            <Modal.Header closeButton>
                <Modal.Title as="div">{chartInfo.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ResponsiveContainer width="100%" height={700}>
                    <BarChart
                        width={1100}
                        data={data}
                        margin={{
                            top: 30, right: 30, left: 30, bottom: 20
                        }}
                        barCategoryGap={0}
                        barGap={0}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis label={{ value: chartInfo.shortName, dy: 5 }} tick={false}/>
                        <YAxis label={{ value: 'Log(s)', position: 'top', dy: -10 }} />
                        <Legend wrapperStyle={{ bottom: 5, left: 87, width: 998 }} />
                        {
                            labels.map((label, index) => (
                                <Bar dataKey={label} key={index} label={{ position: 'top'}}
                                    fill={getBackGroundColor(index)} maxBarSize={20}
                                />
                            ))
                        }
                    </BarChart>
                </ResponsiveContainer>
            </Modal.Body>
        </Modal>
        );
    }
}

export default Chart;