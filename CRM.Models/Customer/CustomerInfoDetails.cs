namespace CRM.Models.Customer
{
    using System.Collections.Generic;
    using CRM.Core.Models;
    using CRM.Models.Common;

    public class CustomerInfoDetails: CustomerSession
    {
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
    }
}