
import { LaunchTemplate } from './LaunchTemplate';
import { MixedInstancesPolicy } from './MixedInstancesPolicy';
import { RequestParametersItem } from './RequestParametersItem';
import { RequestParametersItem_1 } from './RequestParametersItem_1';
import { TargetTrackingConfiguration } from './TargetTrackingConfiguration';

export class RequestParameters {
  'targetTrackingConfiguration': TargetTrackingConfiguration;
  'mixedInstancesPolicy': MixedInstancesPolicy;
  'launchTemplate': LaunchTemplate;
  'healthCheckType': string;
  'userData': string;
  'spotPrice': string;
  'breachThreshold': number;
  'adjustmentType': string;
  'defaultCooldown': number;
  'metricValue': number;
  'availabilityZones': Array<string>;
  'maxSize': number;
  'targetGroupARNs': Array<string>;
  'honorCooldown': boolean;
  'launchConfigurationName': string;
  'autoScalingGroupName': string;
  'forceDelete': boolean;
  'scheduledUpdateGroupActions': Array<any>;
  'scheduledActionName': string;
  'healthCheckGracePeriod': number;
  'newInstancesProtectedFromScaleIn': boolean;
  'instanceIds': Array<string>;
  'minSize': number;
  'startTime': string;
  'topicARN': string;
  'lifecycleHookSpecificationList': Array<any>;
  'imageId': string;
  'loadBalancerNames': Array<string>;
  'policyName': string;
  'scheduledActionNames': Array<string>;
  'instanceType': string;
  'tags': Array<RequestParametersItem>;
  'serviceLinkedRoleARN': string;
  'stepAdjustments': Array<RequestParametersItem_1>;
  'granularity': string;
  'policyType': string;
  'scalingAdjustment': number;
  'securityGroups': Array<string>;
  'notificationTypes': Array<string>;
  'time': string;
  'metrics': Array<string>;
  'protectedFromScaleIn': boolean;
  'desiredCapacity': number;
  'vPCZoneIdentifier': string;

    private static discriminator: string | undefined = undefined;

    private static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "targetTrackingConfiguration",
            "baseName": "targetTrackingConfiguration",
            "type": "TargetTrackingConfiguration"
        },
        {
            "name": "mixedInstancesPolicy",
            "baseName": "mixedInstancesPolicy",
            "type": "MixedInstancesPolicy"
        },
        {
            "name": "launchTemplate",
            "baseName": "launchTemplate",
            "type": "LaunchTemplate"
        },
        {
            "name": "healthCheckType",
            "baseName": "healthCheckType",
            "type": "string"
        },
        {
            "name": "userData",
            "baseName": "userData",
            "type": "string"
        },
        {
            "name": "spotPrice",
            "baseName": "spotPrice",
            "type": "string"
        },
        {
            "name": "breachThreshold",
            "baseName": "breachThreshold",
            "type": "number"
        },
        {
            "name": "adjustmentType",
            "baseName": "adjustmentType",
            "type": "string"
        },
        {
            "name": "defaultCooldown",
            "baseName": "defaultCooldown",
            "type": "number"
        },
        {
            "name": "metricValue",
            "baseName": "metricValue",
            "type": "number"
        },
        {
            "name": "availabilityZones",
            "baseName": "availabilityZones",
            "type": "Array<string>"
        },
        {
            "name": "maxSize",
            "baseName": "maxSize",
            "type": "number"
        },
        {
            "name": "targetGroupARNs",
            "baseName": "targetGroupARNs",
            "type": "Array<string>"
        },
        {
            "name": "honorCooldown",
            "baseName": "honorCooldown",
            "type": "boolean"
        },
        {
            "name": "launchConfigurationName",
            "baseName": "launchConfigurationName",
            "type": "string"
        },
        {
            "name": "autoScalingGroupName",
            "baseName": "autoScalingGroupName",
            "type": "string"
        },
        {
            "name": "forceDelete",
            "baseName": "forceDelete",
            "type": "boolean"
        },
        {
            "name": "scheduledUpdateGroupActions",
            "baseName": "scheduledUpdateGroupActions",
            "type": "Array<any>"
        },
        {
            "name": "scheduledActionName",
            "baseName": "scheduledActionName",
            "type": "string"
        },
        {
            "name": "healthCheckGracePeriod",
            "baseName": "healthCheckGracePeriod",
            "type": "number"
        },
        {
            "name": "newInstancesProtectedFromScaleIn",
            "baseName": "newInstancesProtectedFromScaleIn",
            "type": "boolean"
        },
        {
            "name": "instanceIds",
            "baseName": "instanceIds",
            "type": "Array<string>"
        },
        {
            "name": "minSize",
            "baseName": "minSize",
            "type": "number"
        },
        {
            "name": "startTime",
            "baseName": "startTime",
            "type": "string"
        },
        {
            "name": "topicARN",
            "baseName": "topicARN",
            "type": "string"
        },
        {
            "name": "lifecycleHookSpecificationList",
            "baseName": "lifecycleHookSpecificationList",
            "type": "Array<any>"
        },
        {
            "name": "imageId",
            "baseName": "imageId",
            "type": "string"
        },
        {
            "name": "loadBalancerNames",
            "baseName": "loadBalancerNames",
            "type": "Array<string>"
        },
        {
            "name": "policyName",
            "baseName": "policyName",
            "type": "string"
        },
        {
            "name": "scheduledActionNames",
            "baseName": "scheduledActionNames",
            "type": "Array<string>"
        },
        {
            "name": "instanceType",
            "baseName": "instanceType",
            "type": "string"
        },
        {
            "name": "tags",
            "baseName": "tags",
            "type": "Array<RequestParametersItem>"
        },
        {
            "name": "serviceLinkedRoleARN",
            "baseName": "serviceLinkedRoleARN",
            "type": "string"
        },
        {
            "name": "stepAdjustments",
            "baseName": "stepAdjustments",
            "type": "Array<RequestParametersItem_1>"
        },
        {
            "name": "granularity",
            "baseName": "granularity",
            "type": "string"
        },
        {
            "name": "policyType",
            "baseName": "policyType",
            "type": "string"
        },
        {
            "name": "scalingAdjustment",
            "baseName": "scalingAdjustment",
            "type": "number"
        },
        {
            "name": "securityGroups",
            "baseName": "securityGroups",
            "type": "Array<string>"
        },
        {
            "name": "notificationTypes",
            "baseName": "notificationTypes",
            "type": "Array<string>"
        },
        {
            "name": "time",
            "baseName": "time",
            "type": "string"
        },
        {
            "name": "metrics",
            "baseName": "metrics",
            "type": "Array<string>"
        },
        {
            "name": "protectedFromScaleIn",
            "baseName": "protectedFromScaleIn",
            "type": "boolean"
        },
        {
            "name": "desiredCapacity",
            "baseName": "desiredCapacity",
            "type": "number"
        },
        {
            "name": "vPCZoneIdentifier",
            "baseName": "vPCZoneIdentifier",
            "type": "string"
        }    ];

    public static getAttributeTypeMap() {
        return RequestParameters.attributeTypeMap;
    }
}




