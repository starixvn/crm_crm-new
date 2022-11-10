import React, { PureComponent } from 'react';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import { Modal } from 'react-bootstrap';
import { getBackGroundColor } from '@jsroot/common/shareScripts';
import { Bar, BarChart, Legend, XAxis, YAxis, ResponsiveContainer} from 'recharts';

export class Chart extends PureComponent {
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
        const { chartInfo, reportType } = this.props;
        const data = this.getDataChart(chartInfo);
        const labels = this.getLabelChart(chartInfo);
        const weekly = 2;
        return (
            <Modal className='chart-modal-dynamic' show dialogAs={DraggableModalDialog}
                onHide={this.props.onClose} backdrop="static" keyboard={false} size="xl"
            >
            <Modal.Header closeButton>
                <Modal.Title as="div">{chartInfo.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ResponsiveContainer className={reportType === weekly ? 'weekly-chart' : ''} width="100%" height={data.length > 30 ? 800 : 720}>
                    <BarChart
                        width={1300}
                        data={data}
                        margin={{
                            top: 25, right: 25, left: 25, bottom: data.length > 30 ? 80 : 40
                        }}
                        barCategoryGap={data.length > 20 ? -10 : 0}
                        barGap={data.length > 20 ? -10 : 0}
                    >
                        <XAxis scaleToFit label={{ value: chartInfo.shortName, dy: 30 }} height={labels.length > 30 ? 30 : 20}/>
                        <YAxis allowDataOverflow label={{ value: 'Log(s)', position: 'top', dy: -10 }} />
                        <Legend wrapperStyle={{ bottom: 5, left: 70, width: 1175, height: labels.length > 30 ? 280 : 50}} />
                        {
                            labels.map((label, index) => (
                                <Bar dataKey={label} key={index} label={{ position: 'top'}} fill={getBackGroundColor(index)} />
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