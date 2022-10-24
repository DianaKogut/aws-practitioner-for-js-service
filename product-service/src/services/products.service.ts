import { IProduct } from 'src/models/product.models';
import { IStock } from 'src/models/stock.models';
import { putItemToDb, queryDb, scanDb } from './dynamo-db';
import { StocksService } from './stocks.service';
import { v4 as uuid } from 'uuid';

export class ProductsService {
    private readonly stocksService = new StocksService();

    public async getProducts() {
        const params = { TableName: process.env.DYNAMODB_PRODUCTS_TABLE };
        const products = await scanDb(params);
        const stocks = await this.stocksService.getStocks();

        const productIdToStockMap =
            stocks.reduce((acc: Map<string, IStock>, stock: IStock) =>
                acc.set(stock.product_id, stock), new Map());

        return products.reduce((acc, product) => {
            acc.push({ ...product, count: productIdToStockMap.get(product.id)?.count || 0 });
            return acc;
        }, [] as IProduct[]);
    }

    public async getProductById(id: string): Promise<IProduct> {
        const params = {
            TableName: process.env.DYNAMODB_PRODUCTS_TABLE,
            KeyConditionExpression: `id = :id`,
            ExpressionAttributeValues: { [`:id`]: id },
        };

        const productsQueryResults = await queryDb(params);
        const stocksQueryResults = await this.stocksService.getStockById(id);

        return {
            ...productsQueryResults[0],
            count: stocksQueryResults?.count ||0,
        } as IProduct;
    }

    public async createProduct(product: Omit<IProduct, 'id'>): Promise<IProduct> {
        const generatedId = uuid();
        const params = {
            TableName: process.env.DYNAMODB_PRODUCTS_TABLE,
            Item: {
                'id': generatedId,
                'title': product.title,
                'description': product.description,
                'price': `${product.price}`,
            }
        };

        await putItemToDb(params);
        await this.stocksService.createStock(generatedId, product?.count || 0);

        return this.getProductById(generatedId)
    }
}