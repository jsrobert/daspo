

export class RequestParametersItem {
  'resourceId': string;
  'propagateAtLaunch': boolean;
  'value': string;
  'key': string;
  'resourceType': string;

    private static discriminator: string | undefined = undefined;

    private static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "resourceId",
            "baseName": "resourceId",
            "type": "string"
        },
        {
            "name": "propagateAtLaunch",
            "baseName": "propagateAtLaunch",
            "type": "boolean"
        },
        {
            "name": "value",
            "baseName": "value",
            "type": "string"
        },
        {
            "name": "key",
            "baseName": "key",
            "type": "string"
        },
        {
            "name": "resourceType",
            "baseName": "resourceType",
            "type": "string"
        }    ];

    public static getAttributeTypeMap() {
        return RequestParametersItem.attributeTypeMap;
    }
}




