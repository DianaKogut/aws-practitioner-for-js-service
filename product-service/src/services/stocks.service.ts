import { IStock } from 'src/models/stock.models';
import { putItemToDb, queryDb, scanDb } from './dynamo-db';

export class StocksService {
    public getStocks() {
        const params = { TableName: process.env.DYNAMODB_STOCKS_TABLE };

        return scanDb(params);
    }

    public async getStockById(productId: string): Promise<IStock> {
        const params = {
            ableName: process.env.DYNAMODB_STOCKS_TABLE,
            KeyConditionExpression: `product_id = :product_id`,
            ExpressionAttributeValues: { [`:product_id`]: productId },
        };

        return queryDb(params)[0];
    }

    public async createStock(productId, count: number): Promise<void> {
        const params = {
            TableName: process.env.DYNAMODB_STOCKS_TABLE,
            Item: {
                'product_id': productId,
                'count': `${count}`,
            },
        };

        await putItemToDb(params);
    }
}