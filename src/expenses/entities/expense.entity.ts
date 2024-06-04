import { BaseEntity } from "../../app.base.entity";
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class Expense extends BaseEntity {  
    @Column({ length: 191 })
    description: string;
  
    @Column({ type: 'decimal', scale: 2 })
    price: number;
}

