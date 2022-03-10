using Newtonsoft.Json;

namespace punk.DropDownList.Models
{
    public class PunkDropDownListModel
    {
        [JsonProperty(PropertyName = "key")]
        public string Key { get; set; }

        [JsonProperty(PropertyName = "text")]
        public string Text { get; set; }
    }
}