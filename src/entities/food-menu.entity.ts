import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class FoodMenus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  discount: string;

  @Column({ name: "categories_id" })
  categoriesId: number;
}
