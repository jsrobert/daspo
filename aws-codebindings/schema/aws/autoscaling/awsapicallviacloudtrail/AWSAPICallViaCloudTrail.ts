
import { RequestParameters } from './RequestParameters';
import { ResponseElements } from './ResponseElements';
import { UserIdentity } from './UserIdentity';

export class AWSAPICallViaCloudTrail {
  'responseElements': ResponseElements;
  'requestParameters': RequestParameters;
  'userIdentity': UserIdentity;
  'eventID': string;
  'awsRegion': string;
  'eventVersion': string;
  'sourceIPAddress': string;
  'eventSource': string;
  'errorMessage': string;
  'errorCode': string;
  'userAgent': string;
  'eventType': string;
  'requestID': string;
  'eventTime': Date;
  'eventName': string;

    private static discriminator: string | undefined = undefined;

    private static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "responseElements",
            "baseName": "responseElements",
            "type": "ResponseElements"
        },
        {
            "name": "requestParameters",
            "baseName": "requestParameters",
            "type": "RequestParameters"
        },
        {
            "name": "userIdentity",
            "baseName": "userIdentity",
            "type": "UserIdentity"
        },
        {
            "name": "eventID",
            "baseName": "eventID",
            "type": "string"
        },
        {
            "name": "awsRegion",
            "baseName": "awsRegion",
            "type": "string"
        },
        {
            "name": "eventVersion",
            "baseName": "eventVersion",
            "type": "string"
        },
        {
            "name": "sourceIPAddress",
            "baseName": "sourceIPAddress",
            "type": "string"
        },
        {
            "name": "eventSource",
            "baseName": "eventSource",
            "type": "string"
        },
        {
            "name": "errorMessage",
            "baseName": "errorMessage",
            "type": "string"
        },
        {
            "name": "errorCode",
            "baseName": "errorCode",
            "type": "string"
        },
        {
            "name": "userAgent",
            "baseName": "userAgent",
            "type": "string"
        },
        {
            "name": "eventType",
            "baseName": "eventType",
            "type": "string"
        },
        {
            "name": "requestID",
            "baseName": "requestID",
            "type": "string"
        },
        {
            "name": "eventTime",
            "baseName": "eventTime",
            "type": "Date"
        },
        {
            "name": "eventName",
            "baseName": "eventName",
            "type": "string"
        }    ];

    public static getAttributeTypeMap() {
        return AWSAPICallViaCloudTrail.attributeTypeMap;
    }
}




