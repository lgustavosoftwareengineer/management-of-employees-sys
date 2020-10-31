/* eslint-disable camelcase */
import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import Role from "./Role";

@Entity("employees")
class Employee {
  // id
  @PrimaryGeneratedColumn("increment")
  id: number;

  // nome
  @Column()
  name: string;

  // last_name
  @Column()
  last_name: string;

  // senha
  @Column()
  birth_date: string;

  @Column()
  salary: number;

  @Column()
  role_id: number;
}
export default Employee;
