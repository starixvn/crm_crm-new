namespace CRM.Models.Customer
{
    using System;
    using System.Collections.Generic;
    using CRM.Core.Constants;
    using CRM.Models.Common;

    public class CustomerInfo
    {
        public int CustId { get; set; }
        public int TitleId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string FaxCountryCode { get; set; }

        public string FaxAreaCode { get; set; }

        public string Fax { get; set; }

        public string Skype { get; set; }

        public string MSN { get; set; }

        public string Username { get; set; }

        public int RoleId { get; set; }

        public int SiteId { get; set; }

        /* --- bank info---*/
        public string BankName { get; set; }

        public string BankSwiftCode { get; set; }

        public string BankAccountName { get; set; }

        public string BankAccountNumber { get; set; }

        public string BankAddress { get; set; }
        /* --- bank info---*/

        public string CreatorName { get; set; }

        public int CountryId { get; set; }

        public int ProvinceId { get; set; }

        public int LicenseeType { get; set; }

        public string Question { get; set; }

        public string Answer { get; set; }

        public bool IsVIP { get; set; }

        public DateTime CreateDate { get; set; }

        public DateTime? Birthday { get; set; }

        public string Passport { get; set; }

        public string WeChat { get; set; }

        public string WhatsApp { get; set; }

        public string Line { get; set; }

        public string Yahoo { get; set; }

        public string QQ { get; set; }

        public string BBM { get; set; }

        public string Checker { get; set; }

        public bool Ignored { get; set; }

        public string Username2 { get; set; }

        public string Nickname => CustId > 0 ? Username2 : string.Empty;

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

        public string LanguageIds { get; set; }

        public bool IsHeadline { get; set; }

        public bool IsActive { get; set; }

        public bool IsClosed { get; set; }

        public bool IsSuspended { get; set; }

        public bool IsIgnored { get; set; }

        public bool IsSuper => Role != null && (Role.Id == RoleIdConstants.Super || Role.Id == RoleIdConstants.CRMSuper);

        public bool IsDirectAccount { get; set; }

        public bool IsGuest => Role != null && (Role.Id == RoleIdConstants.Guest || Role.Id == RoleIdConstants.CRMGuest);

        public Setting Title => new Setting { Id = TitleId, Name = string.Empty };

        public Fax FaxInfo => new Fax { CountryCode = FaxCountryCode, AreaCode = FaxAreaCode, FaxNumber = Fax };

        public BaseModel Role { get; set; } = new BaseModel();

        public Site SiteSetting { get; set; } = new Site();

        public Bank BankInfo => new Bank
        {
            Name = BankName,
            SwiftCode = BankSwiftCode,
            AccountName = BankAccountName,
            AccountNumber = BankAccountNumber
        };

        public UserInfo Creator { get; set; }

        public BaseModel Country { get; set; } = new BaseModel();

        public BaseModel Province { get; set; } = new BaseModel();

        public List<PersonalInfoContact> PersonalInfoContacts =>
            new List<PersonalInfoContact>
            {
                new PersonalInfoContact { Name = Pic1Name, Phone = Pic1 },
                new PersonalInfoContact { Name = Pic2Name, Phone = Pic2 },
                new PersonalInfoContact { Name = Pic3Name, Phone = Pic3 },
                new PersonalInfoContact { Name = Pic4Name, Phone = Pic4 }
            };

        public List<string> BettingCode => new List<string> { RefCode1, RefCode2 };

        public List<Phone> PhoneInfo =>
            new List<Phone>
            {
                new Phone { CountryCode = PhoneCountryCode, AreaCode = PhoneAreaCode, PhoneNumber = Phone },
                new Phone { CountryCode = Phone2CountryCode, AreaCode = Phone2AreaCode, PhoneNumber = Phone2 },
                new Phone { CountryCode = Phone3CountryCode, AreaCode = Phone3AreaCode, PhoneNumber = Phone3 }
            };

        public Phone Mobile => new Phone { CountryCode = MobilePhoneCountryCode, AreaCode = MobilePhoneAreaCode, PhoneNumber = MobilePhone };

        public List<int> Languages { get; set; }

        public IEnumerable<CustomerInfo> UplineInfo { get; set; } = new List<CustomerInfo>();
    }
}