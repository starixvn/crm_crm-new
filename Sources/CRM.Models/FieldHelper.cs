namespace CRM.Models;

using CRM.Resources;
using System.Text;
using System.Web;

public static class FieldHelper
{
    public static string GenerateContactInfo(BaseCustomer customerInfo)
    {
        const string pattern = "{0}{1}{2}{3}{4}{5}{6}{7}{8}{9}{10}{11}{12}";
        var phone = new StringBuilder();
        for (var i = 0; i < customerInfo.PhoneInfo.Count; i++)
        {
            phone.Append(JoinCommunication(ViewResources.Phone + (i + 1).ToString(), customerInfo.PhoneInfo[i].ToString()));
        }

        var pic = new StringBuilder();
        for (var j = 0; j < customerInfo.PersonalInfoContacts.Count; j++)
        {
            pic.Append(JoinCommunication(ViewResources.PIC + (j + 1).ToString(), customerInfo.PersonalInfoContacts[j].ToString()));
        }

        return string.Format(
            pattern,
            phone,
            JoinCommunication(ViewResources.Fax, customerInfo.FaxInfo.ToString()),
            JoinCommunication(ViewResources.Mobile, customerInfo.MobilePhone.ToString()),
            pic,
            JoinCommunication(ViewResources.Skype, customerInfo.Skype),
            JoinCommunication(ViewResources.Email, customerInfo.Email),
            JoinCommunication(ViewResources.Telegram, customerInfo.MSN),
            JoinCommunication(ViewResources.WeChat, customerInfo.WeChat),
            JoinCommunication(ViewResources.WhatsApp, customerInfo.WhatsApp),
            JoinCommunication(ViewResources.Line, customerInfo.Line),
            JoinCommunication(ViewResources.Letstalk, customerInfo.Yahoo),
            JoinCommunication(ViewResources.QQ, customerInfo.QQ),
            JoinCommunication(ViewResources.Zalo, customerInfo.BBM));
    }

    private static string JoinCommunication(string label, string value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return string.Empty;
        }

        return $"{label}: {HttpUtility.HtmlEncode(value)}{"<br/>"}";
    }
}