namespace CRM.Criteria.Feedback.AddFeedback
{
    using CRM.Core.Constants;
    using CRM.Core.Extensions.XML;
    using CRM.Core.Models;
    using CRM.Models.Feedback;
    using Fanex.Data;
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public class AddGuestFeedbackCommand : BaseNonQueryCommand
    {
        public int UserId { get; set; }

        public string Username { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public int TitleId { get; set; }

        public int? SiteId { get; set; }

        public DateTime? Birthday { get; set; }

        public int LanguageId { get; set; }

        public string Phone { get; set; }

        public string PhoneCountryCode { get; set; }

        public string PhoneAreaCode { get; set; }

        public string Phone2 { get; set; }

        public string Phone2CountryCode { get; set; }

        public string Phone2AreaCode { get; set; }

        public string Phone3 { get; set; }

        public string Phone3CountryCode { get; set; }

        public string Phone3AreaCode { get; set; }

        public string Passport { get; set; }

        public string MobilePhone { get; set; }

        public string MobilePhoneCountryCode { get; set; }

        public string MobilePhoneAreaCode { get; set; }

        public string Fax { get; set; }

        public string FaxCountryCode { get; set; }

        public string FaxAreaCode { get; set; }

        public string Email { get; set; }

        public string Skype { get; set; }

        public string MSN { get; set; }

        public string Pic1 { get; set; }

        public string Pic2 { get; set; }

        public string Pic3 { get; set; }

        public string Pic4 { get; set; }

        public string Pic1Name { get; set; }

        public string Pic2Name { get; set; }

        public string Pic3Name { get; set; }

        public string Pic4Name { get; set; }

        public int RoleId { get; set; } = RoleIdConstants.CRMGuest;

        public bool IsVip { get; set; }

        public string WeChat { get; set; }

        public string WhatsApp { get; set; }

        public string Line { get; set; }

        public string Yahoo { get; set; }

        public string QQ { get; set; }

        public string BBM { get; set; }

        public DateTime FeedbackDate { get; set; }

        public DateTime ResolutionDate { get; set; }

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

        public int ProvinceId { get; set; }

        public string Subject { get; set; }

        public string Description { get; set; }

        public string Solution { get; set; }

        public string RelatedCustID { get; set; }

        public bool IsReviewed { get; set; }

        public string Review { get; set; }

        public string ReviewerId { get; set; }

        public int LicenseeType { get; set; }

        public string IP { get; set; } = string.Empty;

        public string AutoField { get; set; }

        public int NoInquiries { get; set; }

        public int CreatorId { get; set; }

        public override string GetSettingKey()
        {
            return "Acc_CRM_GuestFeedbackIns";
        }

        public override bool IsValid() => true;
    }
}
