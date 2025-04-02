namespace CRM.Models.Setting;

public class Station
{
    public int StationId { get; set; }

    public string Name { get; set; }

    public int DisplayOrder { get; set; }

    public bool IsActive { get; set; }
}