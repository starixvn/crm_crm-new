namespace CRM.Models.AdminTool.CommunicationToolSetting
{
    public class GetGridDataParam
    {
        public string Username { get; set; }
        public string CategoryIds { get; set; }
        public string SubCategoryIds { get; set; }
        public bool IsDisableCategorySubCategory { get; set; }
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public int TotalRows { get; set; }
    }
}
