namespace CRM.Criteria.Customer;

using Constants;
using Models;

public class UpdateCustomerInfoCommand : BaseNonQueryCommand
{
    public short UserRole { get; } = Constants.UserRole;

    public int Site { get; set; }

    public int CountryId { get; set; }

    public int ProvinceId { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string Nickname { get; set; }

    public string Language { get; set; }

    public string Phone2 { get; set; }

    public string Phone2CountryCode { get; set; }

    public string Phone2AreaCode { get; set; }

    public string Phone3 { get; set; }

    public string Phone3CountryCode { get; set; }

    public string Phone3AreaCode { get; set; }

    public string Phone { get; set; }

    public string PhoneCountryCode { get; set; }

    public string PhoneAreaCode { get; set; }

    public string MobilePhone { get; set; }

    public string MobilePhoneCountryCode { get; set; }

    public string MobilePhoneAreaCode { get; set; }

    public string Email { get; set; }

    public string MSN { get; set; }

    public string Skype { get; set; }

    public string Pic1Name { get; set; }

    public string Pic1 { get; set; }

    public string Pic2Name { get; set; }

    public string Pic2 { get; set; }

    public string Pic3Name { get; set; }

    public string Pic3 { get; set; }

    public string Pic4Name { get; set; }

    public string Pic4 { get; set; }

    public int CustId { get; set; }

    public int UserId { get; set; }

    public string IP { get; set; }

    public override string GetSettingKey() => "Acc_CRM_CustomerUpdateBasicInfo";

    public override bool IsValid() => true;
}