namespace CRM.Criteria.Customer;

using System;
using Fanex.Data;
using Models;

public class EditCustomerInfoDetailCommand : BaseNonQueryCommand
{
    [SpParam(SqlParamName = "CustId")]
    public int CustomerId { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public int TitleId { get; set; }

    public DateTime? BirthDay { get; set; }

    public string LanguageId { get; set; }

    public string Phone { get; set; }

    public string PhoneCountryCode { get; set; }

    public string PhoneAreaCode { get; set; }

    public string Phone2 { get; set; }

    public string Phone2CountryCode { get; set; }

    public string Phone2AreaCode { get; set; }

    public string Phone3 { get; set; }

    public string Phone3CountryCode { get; set; }

    public string Phone3AreaCode { get; set; }

    public string PassPort { get; set; }

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

    public int SiteId { get; set; }

    public string BettingCode { get; set; }

    public string RefCode2 { get; set; }

    public string Line1 { get; set; }

    public string Line2 { get; set; }

    public string Line3 { get; set; }

    public string City { get; set; }

    public int CountryId { get; set; }

    public string PostCode { get; set; }

    public string State { get; set; }

    public bool IsVip { get; set; }

    public bool Ignored { get; set; }

    public string IntroducedBy { get; set; }

    [SpParam(SqlParamName = "AccountHolderName")]
    public string BankHolderName { get; set; }

    [SpParam(SqlParamName = "Wire_BankName")]
    public string BankName { get; set; }

    [SpParam(SqlParamName = "Wire_AccountNo")]
    public string BankAccountNumber { get; set; }

    [SpParam(SqlParamName = "Wire_SwiftCode")]
    public string BankSwiftCode { get; set; }

    public string BankLine1 { get; set; }

    public string BankLine2 { get; set; }

    public string BankLine3 { get; set; }

    public string BankCity { get; set; }

    public string BankCode { get; set; }

    public string BankState { get; set; }

    public int LicenseeType { get; set; }

    public string WhatsApp { get; set; }

    public string Line { get; set; }

    public string WeChat { get; set; }

    public string Yahoo { get; set; }

    public string QQ { get; set; }

    public string BBM { get; set; }

    public int UserId { get; set; }

    public string IP { get; set; }

    public bool IsUpdateHeadlineInfo { get; set; }

    public override string GetSettingKey() => "Acc_CRM_CustomerUpd_New";

    public override bool IsValid() => true;
}