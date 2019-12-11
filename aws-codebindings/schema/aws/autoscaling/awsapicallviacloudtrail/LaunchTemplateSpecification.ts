

export class LaunchTemplateSpecification {
  'version': string;
  'launchTemplateName': string;

    private static discriminator: string | undefined = undefined;

    private static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "version",
            "baseName": "version",
            "type": "string"
        },
        {
            "name": "launchTemplateName",
            "baseName": "launchTemplateName",
            "type": "string"
        }    ];

    public static getAttributeTypeMap() {
        return LaunchTemplateSpecification.attributeTypeMap;
    }
}




