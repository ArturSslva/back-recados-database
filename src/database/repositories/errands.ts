import { ErrandDTO } from "../../dto/errand";
import { Errands } from "../entities/Errands";

export class ErrandsRepository {
    async find() {
        const errands = await Errands.find();

        return errands;
    }

    async findOne(id: number) {
        const errands = await Errands.findOne(id);

        return errands;
    }
    
    async create(errandDTO: ErrandDTO) {
        const errand = await new Errands(errandDTO.content);

        await errand.save();
        
        return errand;
    }

    async update(errandDTO: ErrandDTO) {
        const errand = await Errands.findOne(errandDTO.id);

        if(errand) {
            errand.content = errandDTO.content;
            await errand.save();
        }

        return errand;
    }

    async delete(errandID: number) {
        await Errands.delete(errandID);
    }
    
}