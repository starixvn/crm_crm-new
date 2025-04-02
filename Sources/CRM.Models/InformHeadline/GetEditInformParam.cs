namespace CRM.Models.InformHeadline;

public class GetEditInformParam
{
    public int TitleId { get; set; }

    public byte TypeAccount { get; set; }

    public string Currencies { get; set; }

    public string Levels { get; set; }

    public string Sites { get; set; }

    public byte IsVip { get; set; }

    public bool ExcludeIgnoredAccounts { get; set; }
}