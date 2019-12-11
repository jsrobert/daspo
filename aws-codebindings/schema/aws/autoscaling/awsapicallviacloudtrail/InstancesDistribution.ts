

export class InstancesDistribution {
  'onDemandBaseCapacity': number;
  'spotInstancePools': number;
  'spotAllocationStrategy': string;
  'onDemandAllocationStrategy': string;
  'onDemandPercentageAboveBaseCapacity': number;

    private static discriminator: string | undefined = undefined;

    private static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "onDemandBaseCapacity",
            "baseName": "onDemandBaseCapacity",
            "type": "number"
        },
        {
            "name": "spotInstancePools",
            "baseName": "spotInstancePools",
            "type": "number"
        },
        {
            "name": "spotAllocationStrategy",
            "baseName": "spotAllocationStrategy",
            "type": "string"
        },
        {
            "name": "onDemandAllocationStrategy",
            "baseName": "onDemandAllocationStrategy",
            "type": "string"
        },
        {
            "name": "onDemandPercentageAboveBaseCapacity",
            "baseName": "onDemandPercentageAboveBaseCapacity",
            "type": "number"
        }    ];

    public static getAttributeTypeMap() {
        return InstancesDistribution.attributeTypeMap;
    }
}




