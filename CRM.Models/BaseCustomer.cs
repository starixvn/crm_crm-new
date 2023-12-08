
namespace CRM.Models
{
    using System.Collections.Generic;
    using CRM.Models.Common;

    public class BaseCustomer : BaseModel
    {

        public bool IsActive { get; set; }

        public bool IsClosed { get; set; }

        public bool IsSuspended { get; set; }


        public List<Phone> PhoneInfo { get; set; }

        public Fax FaxInfo { get; set; }

        public Phone MobilePhone { get; set; }

        public List<PersonalInfoContact> PersonalInfoContacts { get; set; }

        public string Skype { get; set; }

        public string Email { get; set; }

        public string MSN { get; set; }

        public string WeChat { get; set; }

        public string WhatsApp { get; set; }

        public string Line { get; set; }

        public string Yahoo { get; set; }

        public string QQ { get; set; }

        public string BBM { get; set; }
    }
}
