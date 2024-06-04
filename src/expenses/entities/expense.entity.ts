import { User } from "../../users/entities/user.entity";
import { BaseEntity } from "../../app.base.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Expense extends BaseEntity {  
    @Column({ length: 191 })
    description: string;
  
    @Column({ type: 'decimal', scale: 2 })
    price: number;

    @ManyToOne(() => User, ({expenses}) => expenses)
    user: User;
}

