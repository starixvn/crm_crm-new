namespace CRM.Models.Report.LogStatistics
{
    using System.Collections.Generic;
    using CRM.Models.Common;

    public class PersonalInfo
    {
        public string PhoneCountryCode { get; set; }
        public string PhoneAreaCode { get; set; }
        public string Phone { get; set; }

        public string Phone2CountryCode { get; set; }
        public string Phone2AreaCode { get; set; }
        public string Phone2 { get; set; }

        public string Phone3CountryCode { get; set; }
        public string Phone3AreaCode { get; set; }
        public string Phone3 { get; set; }

        public List<Phone> Phones
        {
            get
            {
                var phoneList = new List<Phone>();
                var phone = new Phone
                {
                    CountryCode = PhoneCountryCode,
                    AreaCode = PhoneAreaCode,
                    PhoneNumber = Phone
                };
                var phone2 = new Phone
                {
                    CountryCode = Phone2CountryCode,
                    AreaCode = Phone2AreaCode,
                    PhoneNumber = Phone2
                };
                var phone3 = new Phone
                {
                    CountryCode = Phone3CountryCode,
                    AreaCode = Phone3AreaCode,
                    PhoneNumber = Phone3
                };

                phoneList.Add(phone);
                phoneList.Add(phone2);
                phoneList.Add(phone3);

                return phoneList;
            }
        }

        public string PIC1 { get; set; }
        public string PIC2 { get; set; }
        public string PIC3 { get; set; }
        public string PIC4 { get; set; }

        public string PIC1Name { get; set; }
        public string PIC2Name { get; set; }
        public string PIC3Name { get; set; }
        public string PIC4Name { get; set; }

        public List<PersonalInfoContact> PICs
        {
            get
            {
                var pics = new List<PersonalInfoContact>();
                var pic1 = new PersonalInfoContact
                {
                    Name = PIC1Name,
                    Phone = PIC1
                };

                var pic2 = new PersonalInfoContact
                {
                    Name = PIC2Name,
                    Phone = PIC2
                };
                var pic3 = new PersonalInfoContact
                {
                    Name = PIC3Name,
                    Phone = PIC3
                };

                var pic4 = new PersonalInfoContact
                {
                    Name = PIC4Name,
                    Phone = PIC4
                };

                pics.Add(pic1);
                pics.Add(pic2);
                pics.Add(pic3);
                pics.Add(pic4);

                return pics;
            }
        }
    }
}
