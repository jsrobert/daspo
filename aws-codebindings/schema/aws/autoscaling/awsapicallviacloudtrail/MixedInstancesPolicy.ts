
import { InstancesDistribution } from './InstancesDistribution';
import { LaunchTemplate_1 } from './LaunchTemplate_1';

export class MixedInstancesPolicy {
  'launchTemplate': LaunchTemplate_1;
  'instancesDistribution': InstancesDistribution;

    private static discriminator: string | undefined = undefined;

    private static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "launchTemplate",
            "baseName": "launchTemplate",
            "type": "LaunchTemplate_1"
        },
        {
            "name": "instancesDistribution",
            "baseName": "instancesDistribution",
            "type": "InstancesDistribution"
        }    ];

    public static getAttributeTypeMap() {
        return MixedInstancesPolicy.attributeTypeMap;
    }
}




