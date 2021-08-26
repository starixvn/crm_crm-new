namespace CRM.ViewModels.InformHeadline
{
    using System.Collections.Generic;
    using CRM.Models;
    using CRM.Models.InformHeadline;
    using CRM.Models.Setting;

    public class CreateInformHeadlineViewModel
    {
        public IEnumerable<InformStatus> FilterStatuses { get; set; } = new List<InformStatus>();
        public IEnumerable<BaseModel> Currencies { get; set; } = new List<BaseModel>();
        public IEnumerable<FeedbackStatus> ProductStatuses { get; set; } = new List<FeedbackStatus>();
        public IEnumerable<SiteInfo> Sites { get; set; } = new List<SiteInfo>();
        public IEnumerable<Station> Stations { get; set; } = new List<Station>();
        public IEnumerable<InformStatus> Statuses { get; set; } = new List<InformStatus>();
    }
}
