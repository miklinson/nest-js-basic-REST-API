import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DogsModel } from './dogs.interface';

@Injectable()
export class DogsService {
    private dogs: Array<DogsModel> = [];
    private readonly logger = new Logger(DogsService.name);

    public findAll(): Array<DogsModel> {
        this.logger.log(`Returning array of Dogs`);
        return this.dogs;
    }

    public findOne(id: number): DogsModel {
        const dog: DogsModel = this.dogs.find(dog => dog.id === id);
        if(!dog){
            throw new NotFoundException('Dog not found');
        }
        return dog;
    }

}
