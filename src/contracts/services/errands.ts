import { Errands } from "../../database/entities/Errands";
import { ErrandDTO } from "../../dto/errand";

export interface ErrandsServiceInterface {
    find(): Promise<Errands[]>;
    findOne(id: number): Promise<Errands | undefined>;
    create(errandDTO: ErrandDTO): Promise<Errands>;
    update(errandDTO: ErrandDTO): Promise<Errands | undefined>;
    delete(errandID: number): Promise<void>;
}