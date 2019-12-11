
import { CustomizedMetricSpecification } from './CustomizedMetricSpecification';
import { PredefinedMetricSpecification } from './PredefinedMetricSpecification';

export class TargetTrackingConfiguration {
  'predefinedMetricSpecification': PredefinedMetricSpecification;
  'customizedMetricSpecification': CustomizedMetricSpecification;
  'targetValue': number;

    private static discriminator: string | undefined = undefined;

    private static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "predefinedMetricSpecification",
            "baseName": "predefinedMetricSpecification",
            "type": "PredefinedMetricSpecification"
        },
        {
            "name": "customizedMetricSpecification",
            "baseName": "customizedMetricSpecification",
            "type": "CustomizedMetricSpecification"
        },
        {
            "name": "targetValue",
            "baseName": "targetValue",
            "type": "number"
        }    ];

    public static getAttributeTypeMap() {
        return TargetTrackingConfiguration.attributeTypeMap;
    }
}




