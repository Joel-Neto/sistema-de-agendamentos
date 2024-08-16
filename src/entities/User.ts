import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { File } from "./File";
import { Appointment } from "./Appointment";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text", unique: true })
  email: string;

  @Column({ type: "text" })
  password: string;

  @Column({ type: "boolean" })
  provider: boolean;

  @CreateDateColumn({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at: Date;

  // Relacionamento OneToOne com File
  @OneToOne(() => File, (file) => file.user_id)
  @JoinColumn({ name: "avatar_id" })
  avatar_id: File; // Nome do campo para navegação

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments_as_user: Appointment;

  @OneToMany(() => Appointment, (appointment) => appointment.provider)
  appointments_as_provider: Appointment;
}
