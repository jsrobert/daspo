

export class UserIdentity {
  'accessKeyId': string;
  'accountId': string;
  'principalId': string;
  'type': string;
  'arn': string;

    private static discriminator: string | undefined = undefined;

    private static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "accessKeyId",
            "baseName": "accessKeyId",
            "type": "string"
        },
        {
            "name": "accountId",
            "baseName": "accountId",
            "type": "string"
        },
        {
            "name": "principalId",
            "baseName": "principalId",
            "type": "string"
        },
        {
            "name": "type",
            "baseName": "type",
            "type": "string"
        },
        {
            "name": "arn",
            "baseName": "arn",
            "type": "string"
        }    ];

    public static getAttributeTypeMap() {
        return UserIdentity.attributeTypeMap;
    }
}




