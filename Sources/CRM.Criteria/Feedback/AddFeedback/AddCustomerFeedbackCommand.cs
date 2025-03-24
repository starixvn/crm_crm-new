namespace CRM.Criteria.Feedback.AddFeedback
{
    using CRM.Core.Constants;
    using CRM.Models.Feedback;
    using System.Collections.Generic;
    using System;
    using Fanex.Data;
    using System.Linq;
    using Core.Extensions.XML;
    using CRM.Core.Models;

    public class AddCustomerFeedbackCommand : BaseNonQueryCommand
    {
        public int CustId { get; set; }
        public int SourceFeedbackID { get; set; }

        [SpParam(SqlParamName = "RefCode2")]
        public string RefCode { get; set; }
        [SpParam(SqlParamName = "BettingCode")]
        public string SecretCode { get; set; }
        public bool IsCommunicationLog { get; set; }
        public bool IsHeadline { get; set; }
        public bool IsOverwrite { get; set; }

        public int UserId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public int TitleId { get; set; }

        public int? SiteId { get; set; }

        public DateTime? Birthday { get; set; }

        public int LanguageId { get; set; }

        public string Passport { get; set; }

        public int RoleId { get; set; } = RoleIdConstants.CRMGuest;

        public bool? IsVip { get; set; }

        public DateTime FeedbackDate { get; set; }

        public DateTime ResolutionDate { get; set; }

        [SpParam(AllowNull = true)]
        public DateTime? FirstResponseTime { get; set; }

        public string CommunicationID { get; set; }

        [SpParam(Ignored = true)]
        public IEnumerable<ProductSubProductBettypeSetting> Products { get; set; }

        [SpParam(SqlParamName = "product")]
        public string ProductsContent => Products.Any() ? Products.ToXML("ROOT").ToString() : string.Empty;

        public int ResponseId { get; set; }

        [SpParam(Ignored = true)]
        public IEnumerable<CategorySubCategorySetting> Categories { get; set; }

        [SpParam(SqlParamName = "category")]
        public string CategoriesContent => Categories.Any() ? Categories.ToXML("ROOT").ToString() : string.Empty;

        public int StatusId { get; set; }

        public string StationId { get; set; }

        public int CountryId { get; set; }

        public string Subject { get; set; }

        public string Description { get; set; }

        public string Solution { get; set; }

        public string RelatedCustID { get; set; }

        public bool IsReviewed { get; set; }

        public int LicenseeType { get; set; }

        public string IP { get; set; } = string.Empty;

        public string AutoField { get; set; }

        public int NoInquiries { get; set; }

        public int CreatorId { get; set; }

        [SpParam(Ignored = true)]
        public IEnumerable<Models.Feedback.AddCustomerFeedback.NewCommunicationTool> HeadlineStaffInfoCommunications { get; set; }
        [SpParam(Ignored = true)]
        public IEnumerable<Models.Feedback.AddCustomerFeedback.NewCommunicationTool> OtherAccountCommunicationInfos { get; set; }

        public string NewCommunicationTools { get; set; }

        public string Review { get; set; }

        public string ReviewerId { get; set; }

        public int Rating { get; set; }

        public override string GetSettingKey() => "Acc_CRM_NewManualFeedback_FeedbackIns";

        public override bool IsValid() => true;
    }
}
