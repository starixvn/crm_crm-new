namespace CRM.Helpers;

public static class HtmlHelper
{
    public static string ReplaceBreaklineXml(string xml)
    {
        if (string.IsNullOrWhiteSpace(xml))
        {
            return xml;
        }
        var newLine = new[] { "\n", "\r", "\n\r", "\r\n" };
        for (var index = 0; index < newLine.Length; index++)
        {
            xml = xml.Replace(newLine[index], "&#13;");
        }
        return xml;
    }
}