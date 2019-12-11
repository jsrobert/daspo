

export class CustomizedMetricSpecificationItem {
  'name': string;
  'value': string;

    private static discriminator: string | undefined = undefined;

    private static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "name",
            "baseName": "name",
            "type": "string"
        },
        {
            "name": "value",
            "baseName": "value",
            "type": "string"
        }    ];

    public static getAttributeTypeMap() {
        return CustomizedMetricSpecificationItem.attributeTypeMap;
    }
}




