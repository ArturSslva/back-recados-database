import { ErrandDTO } from "../../dto/errand";

export interface ErrandsServiceInterface {
    find(): Promise<ErrandDTO[]>;
    create(errandDTO: ErrandDTO): Promise<ErrandDTO>;
    update(errandDTO: ErrandDTO): Promise<ErrandDTO | undefined>;
    delete(errandID: number): Promise<void>;
}