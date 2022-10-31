import * as AWS from 'aws-sdk';

export const getDatabase = () => {
    return new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1', apiVersion: '2012-08-10' });
}

export const scanDb = async (params) => {
    const ddb = getDatabase();

    return (await ddb.scan(params).promise()).Items;
}

export const queryDb = async (params) => {
    const ddb = getDatabase();

    return (await ddb.query(params).promise()).Items;
}

export const putItemToDb = async (params) => {
    const ddb = getDatabase();

    return (await ddb.put(params).promise());
}