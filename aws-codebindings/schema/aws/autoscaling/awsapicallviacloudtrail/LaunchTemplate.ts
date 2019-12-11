

export class LaunchTemplate {
  'launchTemplateName': string;

    private static discriminator: string | undefined = undefined;

    private static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "launchTemplateName",
            "baseName": "launchTemplateName",
            "type": "string"
        }    ];

    public static getAttributeTypeMap() {
        return LaunchTemplate.attributeTypeMap;
    }
}




