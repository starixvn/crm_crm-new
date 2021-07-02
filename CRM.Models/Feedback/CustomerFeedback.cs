namespace CRM.Models.Feedback
{
    using CRM.Core.Models;
    using CRM.Models.Customer;
    using CRM.Models.Feedback.LatestFeedback;
    using System.Collections.Generic;

    public class CustomerFeedback
    {
        public CustomerFeedback()
        {
            Settings = new List<SettingItems>();
        }

        public CustomerInfo CustomerInfo { get; set; }

        public int FeedbackID { get; set; }

        public int CustID { get; set; }

        public string UserName { get; set; }

        public string FeedbackDate { get; set; }

        public string ResolutionDate { get; set; }

        public string SolveDate { get; set; }

        public BaseModel Extension { get; set; }

        public BaseModel Communication { get; set; }

        public BaseModel Category { get; set; }

        public BaseModel SubCategory { get; set; }

        public BaseModel Product { get; set; }

        public BaseModel SubProduct { get; set; }

        public BaseModel BetType { get; set; }

        public int CountryID { get; set; }

        public int ProvinceID { get; set; }

        public int LanguageID { get; set; }

        public int StatusId { get; set; }

        public int RoleID { get; set; }

        public int ResponseID { get; set; }

        public bool HasRelated { get; set; }

        public IEnumerable<RelatedCustomer> RelatedCustomers { get; set; }

        public string Subject { get; set; }

        public string Description { get; set; }

        public string Solution { get; set; }

        public bool IsReviewed { get; set; }

        public string Review { get; set; }

        public int ReviewerId { get; set; }

        public string ReviewerName { get; set; }

        public int CreatorId { get; set; }

        public int UserId { get; set; }

        public string AutoField { get; set; }

        public int NoInquiries { get; set; }

        public List<SettingItems> Settings { get; set; }
    }
}
