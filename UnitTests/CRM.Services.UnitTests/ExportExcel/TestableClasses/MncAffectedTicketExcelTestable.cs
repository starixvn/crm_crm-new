namespace CRM.Services.UnitTests.ExportExcel.TestableClasses
{
    using System.Collections.Generic;
    using CRM.Models.NotificationCenter;
    using CRM.Services.ExportExcel;
    using OfficeOpenXml;

    public class MncAffectedTicketExcelTestable : MncAffectedTicketExcel
    {
        public MncAffectedTicketExcelTestable(
            string templatePath,
            IEnumerable<AdmSiteTicket> siteTickets,
            string eventTime,
            string eventName
        ) : base (templatePath, siteTickets, eventTime, eventName)
        {
        }

        public IEnumerable<AdmSiteTicket> Public_GetData(IEnumerable<AdmSiteTicket> siteTickets, bool isCredit)
        {
            return GetData(siteTickets, isCredit);
        }

        public void Public_RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            RenderTitle(templateWorksheet, worksheet);
        }

        public void Public_RenderHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            RenderHeader(templateWorksheet, worksheet);
        }

        public void Public_RenderBody(ExcelWorksheet templateWorksheet, bool isCredit)
        {
            RenderBody(templateWorksheet, isCredit);
        }

        public void Public_RenderRow(ExcelWorksheet worksheet, AdmSiteTicket siteTicket, int rowIndex, bool isCredit)
        {
            RenderRow(worksheet, siteTicket, rowIndex, isCredit);
        }

        public void Public_ProcessUI(ExcelWorksheet worksheet, bool isCredit)
        {
            ProcessUI(worksheet, isCredit);
        }

        public void Public_SetStyle(ExcelWorksheet worksheet)
        {
            SetStyle(worksheet);
        }

        public void Public_SetWidthColumn(ExcelWorksheet worksheet, bool isCredit)
        {
            SetWidthColumn(worksheet, isCredit);
        }

        public void Public_DrawBorderCell(ExcelRange cell)
        {
            DrawBorderCell(cell);
        }

        public void Public_StyleDefault(ExcelWorksheet worksheet)
        {
            StyleDefault(worksheet);
        }
    }
}
