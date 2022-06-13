import {Entity, BaseEntity, PrimaryColumn, Column} from "typeorm";

@Entity()
export class Errands extends BaseEntity {
    @PrimaryColumn()
    id?: number;

    @Column()
    content: string;

    constructor(content: string) {
        super();
        this.content = content;
    }
}
