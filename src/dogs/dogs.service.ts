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
        const nameExist: boolean = this.dogs.some(el => el.name === dog.name);
        if (nameExist) {
            throw new UnprocessableEntityException('Dog name already exists.');
        }

        const maxId: number = Math.max(...this.dogs.map(dog => dog.id),0);
        const id: number = maxId + 1;

        // create and insert new dog
        const newDog: DogsModel = { ...dog, id, };
        this.dogs.push(newDog);

        return dog;
    }

    public delete(id: number): void {
        const index: number = this.dogs.findIndex(dog => dog.id === id);
        // -1 is returned when no findIndex() match is found
        if (index === -1) {
            throw new NotFoundException('Dog not found');
        }
        this.dogs.splice(index, 1);
    }

    public update(id: number, dog: DogsModel): DogsModel {
        const index: number = this.dogs.findIndex(dog => dog.id === id);
        // -1 is returned when no findIndex() match is found
        if (index === -1) {
            throw new NotFoundException('Dog not found');
        }
        const nameExist: boolean = this.dogs.some(el => el.name === dog.name && el.id !== id);
        if (nameExist) {
            throw new UnprocessableEntityException('Dog name already exists.');
        }
        const dogDetails: DogsModel  = { ...dog, id };
        this.dogs[index] = dogDetails;
        return dog;
    }

}
