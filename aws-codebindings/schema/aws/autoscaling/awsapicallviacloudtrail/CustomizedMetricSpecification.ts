
import { CustomizedMetricSpecificationItem } from './CustomizedMetricSpecificationItem';

export class CustomizedMetricSpecification {
  'unit': string;
  'statistic': string;
  'metricName': string;
  'namespace': string;
  'dimensions': Array<CustomizedMetricSpecificationItem>;

    private static discriminator: string | undefined = undefined;

    private static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "unit",
            "baseName": "unit",
            "type": "string"
        },
        {
            "name": "statistic",
            "baseName": "statistic",
            "type": "string"
        },
        {
            "name": "metricName",
            "baseName": "metricName",
            "type": "string"
        },
        {
            "name": "namespace",
            "baseName": "namespace",
            "type": "string"
        },
        {
            "name": "dimensions",
            "baseName": "dimensions",
            "type": "Array<CustomizedMetricSpecificationItem>"
        }    ];

    public static getAttributeTypeMap() {
        return CustomizedMetricSpecification.attributeTypeMap;
    }
}




