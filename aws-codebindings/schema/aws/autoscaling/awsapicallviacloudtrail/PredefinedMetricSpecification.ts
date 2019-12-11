

export class PredefinedMetricSpecification {
  'predefinedMetricType': string;

    private static discriminator: string | undefined = undefined;

    private static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "predefinedMetricType",
            "baseName": "predefinedMetricType",
            "type": "string"
        }    ];

    public static getAttributeTypeMap() {
        return PredefinedMetricSpecification.attributeTypeMap;
    }
}




