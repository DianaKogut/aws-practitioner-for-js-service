import { APIGatewayEvent, Context } from 'aws-lambda';
import { main as getProductsById } from './handler';
import * as mockProducts from '../../mock/products-mock';
import { StatusCode } from '@libs/http-status-codes';

describe('Get Product By Id', () => {
    const mockEvent: Partial<APIGatewayEvent> = {
        pathParameters: {}
    };
    const getProductsSpy = jest.spyOn(mockProducts, 'getMockedProducts');

    beforeEach(() => {
        getProductsSpy.mockResolvedValue([
            {
                count: 2,
                description: 'Product1',
                id: '1',
                price: 245,
                title: 'Product1'
            },
        ]);
    });

    it(`should respond with ${StatusCode.BadRequest} status code (Bad Request)`, async () => {
        mockEvent.pathParameters = { id: '10' };

        const response = await getProductsById(mockEvent, {} as Context);

        expect(getProductsSpy).toBeCalled();
        expect(response.statusCode).toBe(StatusCode.BadRequest);
    });

    it(`should respond with ${StatusCode.OK} and return founded product`, async () => {
        const requestedProductId = '1';
        mockEvent.pathParameters = { id: requestedProductId };

        const response = await getProductsById(mockEvent, {} as Context);
        const { data } = JSON.parse(response.body);

        expect(getProductsSpy).toBeCalled();
        expect(response.statusCode).toBe(StatusCode.OK);
        expect(data).toBeTruthy();
        expect(data?.id).toBe(requestedProductId);
    });
});
