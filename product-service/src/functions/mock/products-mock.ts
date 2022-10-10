import { IProduct } from '@functions/product.models';
import { v4 as uuid } from 'uuid';

const PRODUCTS_MOCK: IProduct[] = [
	{
		count: 4,
		description: 'Book: The Year We Learned to Fly',
		id: '1',
		price: 99,
		title: 'The Year We Learned to Fly'
	},
	{
		count: 8,
		description: 'Book: All My Rage: A Novel',
		id: uuid(),
		price: 120,
		title: 'All My Rage: A Novel'
	},
	{
		count: 2,
		description: 'Book: The Overnight Guest: A Novel',
		id: uuid(),
		price: 130,
		title: 'The Overnight Guest: A Novel'
	},
	{
		count: 1,
		description: 'Book: City on Fire: A Novel',
		id: uuid(),
		price: 85,
		title: 'City on Fire: A Novel'
	},
	{
		count: 3,
		description: 'Book: The Cartographers: A Novel',
		id: uuid(),
		price: 85,
		title: 'The Cartographers: A Novel'
	},
	{
		count: 3,
		description: 'Book: Carolina Moonset',
		id: uuid(),
		price: 99,
		title: 'Carolina Moonset'
	},
	{
		count: 2,
		description: 'Book: Sea of Tranquility: A novel',
		id: uuid(),
		price: 245,
		title: 'Sea of Tranquility: A novel'
	},
	{
		count: 2,
		description: 'Book: The Four Winds: A Novel',
		id: uuid(),
		price: 55,
		title: 'The Four Winds: A Novel'
	}
];

export const getMockedProducts = () => new Promise<IProduct[]>(resolve => resolve(PRODUCTS_MOCK));
