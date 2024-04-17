import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BeforeCreate, HasOne, AutoIncrement, BelongsTo, ForeignKey, PrimaryKey } from "sequelize-typescript";

@Table({
    tableName: "roles",
    underscored: true,
    timestamps: true
})

class Role extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @Column(DataType.STRING)
    name!: string;

    @Column(DataType.STRING)
    description!: string;

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;
}

export default Role;