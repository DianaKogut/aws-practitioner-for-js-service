import { APIGatewayEvent, Context } from 'aws-lambda';
import * as mockProducts from '../mock/products-mock';
import { main as getProductsList } from './handler';

describe('Get Products List', () => {
    const mockEvent: Partial<APIGatewayEvent> = {
        pathParameters: {}
    };
    const getProductsSpy = jest.spyOn(mockProducts, 'getMockedProducts');
    const mockedProducts = [
        {
            count: 2,
            description: 'Product1',
            id: '1',
            price: 245,
            title: 'Product1'
        },
    ];

    beforeEach(() => {
        getProductsSpy.mockResolvedValue(mockedProducts);
    });

    it('should return products', async () => {
        const response = await getProductsList(mockEvent, {} as Context);
        const { data } = JSON.parse(response.body);

        expect(data).toEqual(mockedProducts);
    });

});