import { List } from "src/lists/entities/list.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, RelationId, UpdateDateColumn } from "typeorm";

@Entity()
export class ListItem {
    @PrimaryColumn()
    list_item_id: string;

    @ManyToOne(() => List)
    list: List;

    @RelationId((listItem: ListItem) => listItem.list)
    list_id: string

    @Column({type: 'varchar', length: 100})
    text: string;

    @Column({type: 'bool'})
    is_checked: boolean;

    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)'})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)'})
    modified_at: Date;
}