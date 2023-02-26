import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class UserInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "first_name" })
  firstName: string;

  @Column({ name: "last_name" })
  lastName: string;

  @Column({ name: "display_id" })
  displayId: number;
}
