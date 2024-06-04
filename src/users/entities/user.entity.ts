import { BaseEntity } from "../../app.base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @Column({ unique: true })
    email: string;

    @Column()
    password: string;
}
