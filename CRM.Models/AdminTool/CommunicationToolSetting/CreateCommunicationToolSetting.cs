namespace CRM.Models.AdminTool.CommunicationToolSetting
{
    using System.Collections.Generic;

    public class CreateCommunicationToolSetting
    {
        public string CategoryIds { get; set; }
        public string SubCategoryIds { get; set; }
        public string CommunicationIds { get; set; }
        public IEnumerable<BaseModel> Customers { get; set; } = new List<BaseModel>();
    }
}