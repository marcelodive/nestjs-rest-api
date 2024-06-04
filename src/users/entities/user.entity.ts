import { Expense } from "../../expenses/entities/expense.entity";
import { BaseEntity } from "../../app.base.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Expense, ({user}) => user)
    expenses: Expense[];
}
