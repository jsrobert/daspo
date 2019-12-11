

export class ResponseElements {
  'policyARN': string;
  'failedScheduledActions': Array<any>;
  'failedScheduledUpdateGroupActions': Array<any>;
  'alarms': Array<any>;

    private static discriminator: string | undefined = undefined;

    private static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "policyARN",
            "baseName": "policyARN",
            "type": "string"
        },
        {
            "name": "failedScheduledActions",
            "baseName": "failedScheduledActions",
            "type": "Array<any>"
        },
        {
            "name": "failedScheduledUpdateGroupActions",
            "baseName": "failedScheduledUpdateGroupActions",
            "type": "Array<any>"
        },
        {
            "name": "alarms",
            "baseName": "alarms",
            "type": "Array<any>"
        }    ];

    public static getAttributeTypeMap() {
        return ResponseElements.attributeTypeMap;
    }
}




