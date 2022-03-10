using System;
using Umbraco.Core.Models.PublishedContent;
using Umbraco.Core.PropertyEditors;

namespace punk.DropDownList.ValueConverters
{
    public class PunkDropDownListPropertyValueConverter : PropertyValueConverterBase
    {
        public override bool IsConverter(IPublishedPropertyType propertyType) => propertyType.EditorAlias == "punkDropDownList";

        public override Type GetPropertyValueType(IPublishedPropertyType propertyType) => typeof(string);

        public override bool? IsValue(object value, PropertyValueLevel level) => value?.ToString() != "[]";

        public override object ConvertSourceToIntermediate
            (IPublishedElement owner, IPublishedPropertyType propertyType, object source, bool preview) =>
            source?.ToString();

        public override object ConvertIntermediateToObject(
            IPublishedElement owner, IPublishedPropertyType propertyType, PropertyCacheLevel referenceCacheLevel, object inter, bool preview)
        {
            if (inter == null)
                return null;

            return inter;
        }
    }
}
