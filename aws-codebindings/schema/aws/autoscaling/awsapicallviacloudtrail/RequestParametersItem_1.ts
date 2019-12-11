

export class RequestParametersItem_1 {
  'metricIntervalLowerBound': number;
  'scalingAdjustment': number;

    private static discriminator: string | undefined = undefined;

    private static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "metricIntervalLowerBound",
            "baseName": "metricIntervalLowerBound",
            "type": "number"
        },
        {
            "name": "scalingAdjustment",
            "baseName": "scalingAdjustment",
            "type": "number"
        }    ];

    public static getAttributeTypeMap() {
        return RequestParametersItem_1.attributeTypeMap;
    }
}




