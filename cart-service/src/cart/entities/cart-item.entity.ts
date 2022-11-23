import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface CreationAttrs {
    cart_id: string;
    product_id: string;
    count: number;
}

@Table({ tableName: 'cart-items' })
export class CartItem extends Model<CartItem, CreationAttrs> {
    @Column({
        type: DataType.STRING,
        unique: true,
        primaryKey: true,
    })
    product_id: string;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    cart_id: string;

    @Column({ type: DataType.NUMBER, unique: false, allowNull: false })
    count: string;
}
