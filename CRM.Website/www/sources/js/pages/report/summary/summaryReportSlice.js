import { createSlice } from '@reduxjs/toolkit';

const summaryReportSlice = createSlice({
    name: 'summaryReport',
    initialState: {     
        allSettingData:null,   
        gridParams: {
            year: new Date().getFullYear(),
            categories:'',
            siteType: 0
        },
        gridData: null,
        contentChartPopup: { show: false }
    },
    reducers: {      
        setAllSetting: (state, action) => {
            state.allSettingData = action.payload;
        },
        setGridParams: (state, action) => {
            state.gridParams = action.payload;
        },
        setGridData: (state, action) => {
            state.gridData = action.payload;
        },
        setChartPopup: (state, action) => {
            state.contentChartPopup = action.payload;
        }
    }
});

const { actions, reducer } = summaryReportSlice;

export const {
    setAllSetting,
    setGridParams,
    setGridData,
    setChartPopup
} = actions;

export default reducer;
