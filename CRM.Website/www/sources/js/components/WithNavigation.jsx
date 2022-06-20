import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const WithNavigation = Component => props => <Component {...props} navigate={useNavigate()} location={useLocation()}/>;

export default WithNavigation;