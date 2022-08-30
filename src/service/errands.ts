import { ErrandsServiceInterface } from "../contracts/services/errands";
import { ErrandsRepository } from "../database/repositories/errands";
import { ErrandDTO } from "../dto/errand";

export class ErrandService implements ErrandsServiceInterface {
    async find(): Promise<ErrandDTO[]> {
        const repository = new ErrandsRepository();
        const errand = await repository.find();

        return errand;
    }

    async create(errandDTO: ErrandDTO) {
        const repository = new ErrandsRepository();
        const errand = await repository.create(errandDTO);

        return {
            id: errand.id,
            content: errand.content
        };
    }

    async update(errandDTO: ErrandDTO) {
        const repository = new ErrandsRepository();
        const errand = await repository.update(errandDTO);

        return {
            id: errand!.id,
            content: errand!.content
        };
    }
    
    async delete(errandID: number) {
        const repository = new ErrandsRepository();
        await repository.delete(errandID);
    }

}