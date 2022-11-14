namespace CRM.Letstalk.Client.Models
{
    using CRM.Letstalk.Client.Enum;
    using Newtonsoft.Json;

    public class OutgoingMessage
    {
        [JsonIgnore]
        public MessageTypeEnum MessageType { get; set; }

        [JsonProperty(PropertyName = "type")]
        public string Type
        {
            get
            {
                switch (MessageType)
                {
                    case MessageTypeEnum.Text:
                        return MulticastType.Text;

                    case MessageTypeEnum.Image:
                        return MulticastType.Image;

                    case MessageTypeEnum.FullImage:
                        return MulticastType.FullImage;

                    case MessageTypeEnum.Html:
                        return MulticastType.HTML;

                    default:
                        return MulticastType.Text;
                }
            }
        }

        [JsonProperty(PropertyName = "text")]
        public string Text { get; set; }

        [JsonProperty(PropertyName = "imageUrl")]
        public string ImageUrl { get; set; }
    }

    internal static class MulticastType
    {
        public const string Text = "text";
        public const string HTML = "html";
        public const string Image = "image";
        public const string FullImage = "fullimage";
    }
}