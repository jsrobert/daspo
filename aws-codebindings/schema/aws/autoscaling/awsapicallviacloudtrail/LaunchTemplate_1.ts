
import { LaunchTemplateSpecification } from './LaunchTemplateSpecification';

export class LaunchTemplate_1 {
  'launchTemplateSpecification': LaunchTemplateSpecification;
  'overrides': Array<any>;

    private static discriminator: string | undefined = undefined;

    private static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "launchTemplateSpecification",
            "baseName": "launchTemplateSpecification",
            "type": "LaunchTemplateSpecification"
        },
        {
            "name": "overrides",
            "baseName": "overrides",
            "type": "Array<any>"
        }    ];

    public static getAttributeTypeMap() {
        return LaunchTemplate_1.attributeTypeMap;
    }
}




