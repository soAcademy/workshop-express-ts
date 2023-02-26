import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "files" })
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  mimetype: string;

  @Column()
  destination: string;

  @Column()
  originalname: string;

  @Column()
  path: string;
}
