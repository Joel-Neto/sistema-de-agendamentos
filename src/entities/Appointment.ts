import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { File } from "./File";
import { copyFile } from "node:fs";
import { User } from "./User";

@Entity("appoointments")
export class Appointment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "datetime" })
  date: Date;

  @Column({ type: "datetime", nullable: true })
  canceled_at: Date;

  @CreateDateColumn({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.appointments_as_user)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => User, (user) => user.appointments_as_provider)
  @JoinColumn({ name: "provider_id" })
  provider: User;
}
