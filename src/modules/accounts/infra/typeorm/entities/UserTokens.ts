import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";
import { User } from "./User";

@Entity("users_tokens_api_b")
class UserTokens {
    
    @PrimaryColumn()
    id: string;

    @Column()
    refresh_token: string;

    @Column()
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id"})
    user: User

    @Column()
    expires_date: Date

    @CreateDateColumn()
    created_at: Date

    constructor() {
        if(!this.id)
        this.id = v4()
    }


}

export { UserTokens }