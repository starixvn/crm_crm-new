namespace CRM.Models.Report.LogStatistics
{
    using System;
    using CRM.Models.Common;

    public class StatisticsDetailbyDateModel : PersonalInfo
    {

        public int FeedbackID { get; set; }

        public string FaxCountryCode { get; set; }

        public string FaxAreaCode { get; set; }

        public string Fax { get; set; }

        public Fax FaxInfo
        {
            get
            {
                Fax fax = new Fax
                {
                    CountryCode = FaxCountryCode,
                    AreaCode = FaxAreaCode,
                    FaxNumber = Fax
                };
                return fax;
            }

        }

        public string MobilePhoneCountryCode { get; set; }

        public string MobilePhoneAreaCode { get; set; }

        public string MobilePhone { get; set; }

        public Phone MobilePhoneInfo
        {
            get
            {
                Phone phone = new Phone
                {
                    CountryCode = MobilePhoneCountryCode,
                    AreaCode = MobilePhoneAreaCode,
                    PhoneNumber = MobilePhone
                };
                return phone;
            }
        }
        public string CountryName { get; set; }

        public string Skype { get; set; }

        public string Email { get; set; }

        public string MSN { get; set; }

        public string WeChat { get; set; }

        public string WhatsApp { get; set; }

        public string Line { get; set; }

        public string Yahoo { get; set; }

        public string QQ { get; set; }

        public string Bbm { get; set; }

        public DateTime FeedbackDate { get; set; }

        public string StartTime => FeedbackDate.ToString("hh:mm tt");

        public string EndTime => ResolutionDate.ToString("hh:mm tt");

        public string DurationTime => ResolutionDate != DateTimeOffset.MinValue.DateTime ? GetResolvingTime() : string.Empty;

        public string UserName { get; set; }

        public string SiteName { get; set; }

        public Setting CommunicationTool { get; set; }

        public string Role { get; set; }

        public string Contact
        {
            get
            {
                BaseCustomer customer = new BaseCustomer
                {
                    PhoneInfo = Phones,
                    PersonalInfoContacts = PICs,
                    FaxInfo = FaxInfo,
                    MobilePhone = MobilePhoneInfo,
                    Skype = Skype,
                    Email = Email,
                    MSN = MSN,
                    WeChat = WeChat,
                    WhatsApp = WhatsApp,
                    Line = Line,
                    Yahoo = Yahoo,
                    QQ = QQ,
                    BBM = Bbm
                };

                return FieldHelper.GenerateContactInfo(customer);
            }
        }

        public string NewContact { get; set; }
        public bool IsHeadline { get; set; }
        public string Remark { get; set; }

        public string AutoField { get; set; }

        public string RemarkText => !string.IsNullOrEmpty(AutoField) ? GetAutoFieldText() : Remark;

        public string Solution { get; set; }

        public string Status { get; set; }

        public string Language { get; set; }

        public string Response { get; set; }

        public string CreatorName { get; set; }

        public DateTime CreateDate { get; set; }

        public DateTime ResolutionDate { get; set; }

        public int ProductID { get; set; }

        public int SubProductID { get; set; }

        public int CategoryID { get; set; }

        public int SubCategoryID { get; set; }

        public int CommunicationID { get; set; }

        public int StationID { get; set; }

        public int NoInquiries { get; set; }
        public bool IsNewFeedback { get; set; }

        private string GetResolvingTime()
        {
            var totalDays = ResolutionDate - FeedbackDate;
            return string.Format("{0:dd\\:hh\\:mm}", totalDays);
        }

        private string GetAutoFieldText()
        {
            return (new System.Text.RegularExpressions.Regex("\n")).Replace(AutoField, "<br>") + "<br><br>" + Remark;
        }
    }
}
