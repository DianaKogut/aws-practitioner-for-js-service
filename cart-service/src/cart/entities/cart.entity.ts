import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface CreationAttrs {
    id: string;
    created_at: Date;
    updated_at: Date;
}

@Table({ tableName: 'carts' })
export class Cart extends Model<Cart,CreationAttrs> {
    @Column({
        type: DataType.STRING,
        unique: true,
        primaryKey: true,
    })
    id: number;

    @Column({ type: DataType.DATE, unique: false, allowNull: false })
    created_at: string;

    @Column({ type: DataType.DATE, unique: false, allowNull: false })
    updated_at: string;
}

