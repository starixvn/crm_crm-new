namespace CRM.Core.Helpers
{
    public static class HtmlHelper
    {
        public static string ReplaceBreaklineXml(string xml)
        {
            if (string.IsNullOrWhiteSpace(xml))
            {
                return xml;
            }
            string[] newLine = new[] { "\n", "\r", "\n\r", "\r\n" };
            for (int index = 0; index < newLine.Length; index++)
            {
                xml = xml.Replace(newLine[index], "&#13;");
            }
            return xml;
        }
    }
}
