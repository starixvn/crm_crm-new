namespace CRM.Services.ExportExcel
{
    public class MncAffectedTicketExcel
    {
        private const byte RowStartHeader = 4;
        private const byte RowStartBody = 5;
        private const byte TotalColumnsChatType = 3;
        private int rowIndex = RowStartBody;
        private int rowIndexChild = RowStartBody;
    }
}
