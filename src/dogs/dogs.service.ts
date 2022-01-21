import { Injectable, Logger, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
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

    public create(dog: DogsModel): DogsModel {
        const nameExist: boolean = this.dogs.some(dog => dog.name === dog.name);
        if (nameExist) {
            throw new UnprocessableEntityException('Dog name already exists.');
        }

        const maxId: number = Math.max(...this.dogs.map(dog => dog.id));
        const id: number = maxId + 1;

        // create and insert new dog
        const newDog: DogsModel = { ...dog, id, };
        this.dogs.push(newDog);

        return dog;
    }

}
