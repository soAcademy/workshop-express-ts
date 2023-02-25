import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Courses {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @CreateDateColumn({ name: "start_date" })
  startDate: Date;

  @CreateDateColumn({ name: "end_date" })
  endDate: Date;

  @Column({ name: "student_max" })
  studentMax: number;

  @Column({ name: "categories_id" })
  categoriesId: number;

  @Column({ name: "teachers_id" })
  teachersId: number;
}
