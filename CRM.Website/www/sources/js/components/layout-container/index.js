import React, {PureComponent, lazy, Suspense } from 'react';
import Layout from './components/Layout';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

const NotificationListComponent  = lazy(() => import('@jsroot/pages/notification-list/index'));
const NotificationTemplateComponent = lazy(() => import('@jsroot/pages/notification-template/index'));
const NotificationTypeComponent = lazy(() => import('@jsroot/pages/notification-type/index'));
const DashboardComponent = lazy(() => import('@jsroot/pages/dashboard/index'));

export default class Index extends PureComponent {
    render() {
        return (
            <Router>
                <Layout>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path="/" />
                            <Route path="/NotificationList" element={<NotificationListComponent />} />
                            <Route path="/NotificationTemplate" element={<NotificationTemplateComponent />} />
                            <Route path="/NotificationType" element={<NotificationTypeComponent />} />
                            <Route path="/Dashboard" element={<DashboardComponent />} />
                        </Routes>
                    </Suspense>
                </Layout>
            </Router>
        );
    }
}