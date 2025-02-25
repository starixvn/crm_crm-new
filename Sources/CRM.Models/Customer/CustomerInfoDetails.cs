namespace CRM.Models.Customer
{
    using System;
    using System.Collections.Generic;
    using CRM.Core.Constants;
    using CRM.Core.Models;
    using CRM.Models.Common;

    public class CustomerInfoDetails : CustomerPermissionInfo
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
        public string BankAddressLine1 { get; set; }
        public string BankAddressLine2 { get; set; }
        public string BankAddressLine3 { get; set; }
        public string BankAddressCity { get; set; }
        public string BankAddressState { get; set; }
        public string BankAddressPostCode { get; set; }
        public int BankAddressCountryId { get; set; }
        public string BankHolderName { get; set; }
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
        public string IntroducedBy { get; set; }
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
        public bool IsSuper => RoleId == RoleIdConstants.Super || RoleId == RoleIdConstants.CRMSuper;
        public bool IsDirectAccount { get; set; }
        public bool IsGuest => RoleId == RoleIdConstants.Guest || RoleId == RoleIdConstants.CRMGuest;
        public string RoleName { get; set; }
        public BaseSetting SiteSetting { get; set; } = new BaseSetting();
        public string Line1 { get; set; }
        public string Line2 { get; set; }
        public string Line3 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PostCode { get; set; }
        public BaseSetting Country { get; set; } = new BaseSetting();
        public BaseSetting Province { get; set; } = new BaseSetting();
        public List<string> BettingCode => new List<string> { RefCode1, RefCode2 };
        public List<int> Languages { get; set; }
        public IEnumerable<CustomerInfoDetails> UplineInfo { get; set; } = new List<CustomerInfoDetails>();
        public IEnumerable<HeadlineStaffInfoPic> HeadlineStaffInfoPics { get; set; }
        public IEnumerable<HeadlineStaffInfoLanguage> HeadlineStaffInfoLanguages { get; set; }
        public IEnumerable<HeadlineStaffInfoCommunication> HeadlineStaffInfoCommunications { get; set; }
        public IEnumerable<OtherAccountCommunicationInfo> OtherAccountCommunicationInfos { get; set; }
        public Setting Title => new Setting { Id = TitleId, Name = string.Empty };
        public Fax FaxInfo => new Fax { CountryCode = FaxCountryCode, AreaCode = FaxAreaCode, FaxNumber = Fax };

        public Bank BankInfo => new Bank
        {
            Name = BankName,
            SwiftCode = BankSwiftCode,
            AccountName = BankAccountName,
            AccountNumber = BankAccountNumber,
            HolderName = BankHolderName,
            AddressInfo = new Address
            {
                LineList = new List<string>
                {
                    BankAddressLine1, BankAddressLine2, BankAddressLine3
                },
                City = BankAddressCity,
                State = BankAddressState,
                PostCode = BankAddressPostCode,
                Country = new Country
                {
                    Id = BankAddressCountryId
                }
            }
        };

        public Address AddressInfo => new Address
        {
            LineList = new List<string>
            {
                Line1, Line2, Line3
            },
            City = City,
            State = State,
            PostCode = PostCode,
            Country = new Country { Id = CountryId }
        };

        public UserInfo Creator { get; set; }

        public List<PersonalInfoContact> PersonalInfoContacts =>
            new List<PersonalInfoContact>
            {
                new PersonalInfoContact { Name = Pic1Name, Phone = Pic1 },
                new PersonalInfoContact { Name = Pic2Name, Phone = Pic2 },
                new PersonalInfoContact { Name = Pic3Name, Phone = Pic3 },
                new PersonalInfoContact { Name = Pic4Name, Phone = Pic4 }
            };

        public List<Phone> PhoneInfo =>
            new List<Phone>
            {
                new Phone { CountryCode = PhoneCountryCode, AreaCode = PhoneAreaCode, PhoneNumber = Phone },
                new Phone { CountryCode = Phone2CountryCode, AreaCode = Phone2AreaCode, PhoneNumber = Phone2 },
                new Phone { CountryCode = Phone3CountryCode, AreaCode = Phone3AreaCode, PhoneNumber = Phone3 }
            };

        public Phone Mobile => new Phone { CountryCode = MobilePhoneCountryCode, AreaCode = MobilePhoneAreaCode, PhoneNumber = MobilePhone };

        public int? Rating { get; set; }
    }
}