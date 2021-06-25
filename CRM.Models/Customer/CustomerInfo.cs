namespace CRM.Models.Customer
{
    using CRM.Core.Constants;
    using CRM.Models.Common;
    using System;
    using System.Collections.Generic;

    public class CustomerInfo : BaseModel
    {
        public CustomerInfo()
        {
            SiteSetting = new Site();
            Country = new BaseModel();
            Province = new BaseModel();
            Role = new BaseModel();
            UplineInfo = new List<CustomerInfo>();
        }

        public int TitleID { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string FaxCountryCode { get; set; }

        public string FaxAreaCode { get; set; }

        public string FaxNumber { get; set; }

        public string Skype { get; set; }

        public string MSN { get; set; }

        public string UserName { get; set; }

        public int RoleID { get; set; }

        public int SiteID { get; set; }

        /* --- bank info---*/
        public string BankName { get; set; }

        public string BankSwiftCode { get; set; }

        public string BankAccountName { get; set; }

        public string BankAccountNumber { get; set; }

        public string BankAddress { get; set; }
        /* --- bank info---*/

        public string CreatorName { get; set; }

        public int CountryID { get; set; }

        public int ProvinceID { get; set; }

        public int LicenseeType { get; set; }

        public string Question { get; set; }

        public string Answer { get; set; }

        public bool IsVIP { get; set; }

        public DateTime CreateDate { get; set; }

        public DateTime BirthDay { get; set; }

        public string WeChat { get; set; }

        public string WhatsApp { get; set; }

        public string Line { get; set; }

        public string Yahoo { get; set; }

        public string QQ { get; set; }

        public string BBM { get; set; }

        public string Checker { get; set; }

        public bool Ignored { get; set; }

        public string UserName2 { get; set; }

        public string NickName
        {
            get
            {
                return Id > 0 ? UserName2 : string.Empty;
            }
        }

        public string Pic1Name { get; set; }

        public string Pic1 { get; set; }

        public string Pic2Name { get; set; }

        public string Pic2 { get; set; }

        public string Pic3Name { get; set; }

        public string Pic3 { get; set; }

        public string Pic4Name { get; set; }

        public string Pic4 { get; set; }

        public string RefCode1 { get; set; }

        public string RefCode2 { get; set; }

        public string PhoneCountryCode { get; set; }

        public string PhoneAreaCode { get; set; }

        public string Phone { get; set; }

        public string Phone2CountryCode { get; set; }

        public string Phone2AreaCode { get; set; }

        public string Phone2 { get; set; }

        public string Phone3CountryCode { get; set; }

        public string Phone3AreaCode { get; set; }

        public string Phone3 { get; set; }

        public string MobilePhoneCountryCode { get; set; }

        public string MobilePhoneAreaCode { get; set; }

        public string MobilePhone { get; set; }

        public bool IsGroupHeadLine { get; set; }

        public string Status { get; set; }

        public bool Locked { get; set; }

        public int OriginalDangerLevel { get; set; }

        public int ABTDangerLevel { get; set; }

        public int OtherSportsDangerLevel { get; set; }

        public string LanguageID { get; set; }

        public bool IsHeadline { get; set; }

        public bool IsActive { get; set; }

        public bool IsClosed { get; set; }

        public bool IsSuspended { get; set; }

        public bool IsIgnored { get; set; }

        public bool IsSuper => Role != null
            && (Role.Id == RoleIdConstants.Super || Role.Id == RoleIdConstants.CRMSuper || Role.Id == RoleIdConstants.CN88Super);

        public bool IsDirectAccount { get; set; }

        public bool IsGuest => Role != null
            && (Role.Id == RoleIdConstants.Guest || Role.Id == RoleIdConstants.CRMGuest || Role.Id == RoleIdConstants.CN88Guest);

        public Setting Title
        {
            get
            {
                return new Setting { Id = TitleID, Name = string.Empty };
            }
        }

        public Fax FaxInfo
        {
            get
            {
                return new Fax { CountryCode = FaxCountryCode, AreaCode = FaxAreaCode, FaxNumber = FaxNumber };
            }
        }

        public BaseModel Role { get; set; }

        public Site SiteSetting { get; set; }

        public Bank BankInfo
        {
            get
            {
                return new Bank { Name = BankName, SwiftCode = BankSwiftCode, AccountName = BankAccountName, AccountNumber = BankAccountNumber };
            }
        }

        public UserInfo Creator { get; set; }

        public BaseModel Country { get; set; }

        public BaseModel Province { get; set; }

        public BaseModel LicenseeTypeObj { get; set; }

        public List<PersonalInfoContact> PersonalInfoContacts
        {
            get
            {
                var piccontacts = new List<PersonalInfoContact>
                {
                    new PersonalInfoContact { Name = Pic1Name, Phone = Pic1 },
                    new PersonalInfoContact { Name = Pic2Name, Phone = Pic2 },
                    new PersonalInfoContact { Name = Pic3Name, Phone = Pic3 },
                    new PersonalInfoContact { Name = Pic4Name, Phone = Pic4 }
                };
                return piccontacts;
            }
        }

        public List<string> BettingCode
        {
            get
            {
                var bettingcodes = new List<string>
                {
                    RefCode1,
                    RefCode2
                };
                return bettingcodes;
            }
        }

        public List<Phone> PhoneInfo
        {
            get
            {
                var phoneInfo = new List<Phone>
                {
                    new Phone { CountryCode = PhoneCountryCode, AreaCode = PhoneAreaCode, PhoneNumber = Phone },
                    new Phone { CountryCode = Phone2CountryCode, AreaCode = Phone2AreaCode, PhoneNumber = Phone2 },
                    new Phone { CountryCode = Phone3CountryCode, AreaCode = Phone3AreaCode, PhoneNumber = Phone3 }
                };
                return phoneInfo;
            }
        }

        public Phone Mobile
        {
            get
            {
                return new Phone { CountryCode = MobilePhoneCountryCode, AreaCode = MobilePhoneAreaCode, PhoneNumber = MobilePhone };
            }
        }

        public List<int> Languages { get; set; }

        public IEnumerable<CustomerInfo> UplineInfo { get; set; }
    }

}
