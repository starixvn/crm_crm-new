namespace CRM.Criteria.Feedback.LatestFeedback
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using CRM.Core.Extensions.XML;
    using CRM.Core.Models;
    using CRM.Models.Feedback;

    public class EditFeedbackCommand : BaseNonQueryCommand
    {
        public int FeedbackID { get; set; }

        public int TitleID { get; set; }

        public int UserID { get; set; }

        public DateTime Birthday { get; set; }

        public int CountryID { get; set; }

        public int ProvinceID { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public int SiteID { get; set; }

        public string Phone { get; set; }

        public string PhoneCountryCode { get; set; }

        public string PhoneAreaCode { get; set; }

        public string Phone2 { get; set; }

        public string Phone2CountryCode { get; set; }

        public string Phone2AreaCode { get; set; }

        public string Phone3 { get; set; }

        public string Phone3CountryCode { get; set; }

        public string Phone3AreaCode { get; set; }

        public string MobilePhone { get; set; }

        public string MobilePhoneCountryCode { get; set; }

        public string MobilePhoneAreaCode { get; set; }

        public string Fax { get; set; }

        public string FaxCountryCode { get; set; }

        public string FaxAreaCode { get; set; }

        public string Email { get; set; }

        public string Skype { get; set; }

        public string MSN { get; set; }

        public string BBM { get; set; }

        public string QQ { get; set; }

        public string Yahoo { get; set; }

        public string WeChat { get; set; }

        public string Line { get; set; }

        public string WhatsApp { get; set; }

        public string LanguageID { get; set; }

        public string Subject { get; set; }

        public string RelatedCustID { get; set; }

        public DateTime FeedbackDate { get; set; }

        public DateTime ResolutionDate { get; set; }

        public string CommunicationID { get; set; }

        public string StationID { get; set; }

        public int RoleID { get; set; }

        public IEnumerable<ProductSubProductBettypeSetting> Products { get; set; }

        public string Product => Products.Any() ? Products.ToXML("ROOT").ToString() : string.Empty;

        public IEnumerable<CategorySubCategorySetting> Categories { get; set; }

        public string Category => Categories.Any() ? Categories.ToXML("ROOT").ToString() : string.Empty;

        public int ResponseID { get; set; }

        public int StatusID { get; set; }

        public string Description { get; set; }

        public string AutoField { get; set; }

        public string Solution { get; set; }

        public int UpdateReviewedMode { get; set; }

        public bool IsReviewed { get; set; }

        public string Review { get; set; }

        public int ReviewerID { get; set; }

        public string BettingCode { get; set; }

        public string RefCode2 { get; set; }

        public string Passport { get; set; }

        public string IsVip { get; set; }

        public int LicenseeType { get; set; }

        public string Pic1Name { get; set; }

        public string Pic1 { get; set; }

        public string Pic2Name { get; set; }

        public string Pic2 { get; set; }

        public string Pic3Name { get; set; }

        public string Pic3 { get; set; }

        public string Pic4Name { get; set; }

        public string Pic4 { get; set; }

        public int CustID { get; set; }

        public string IP { get; set; }

        public bool IsOverWrite { get; set; }

        public int? NoInquiries { get; set; }

        public override string GetSettingKey() => "Acc_CRM_FeedbackInfoUpd";

        public override bool IsValid()
        {
            return FeedbackID > 0 && !string.IsNullOrWhiteSpace(CommunicationID)
                    && !string.IsNullOrWhiteSpace(LanguageID)
                    && !string.IsNullOrWhiteSpace(Category);
        }
    }
}