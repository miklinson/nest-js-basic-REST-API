import { Injectable, Logger } from '@nestjs/common';
import { DogsModel } from './dogs.interface';

@Injectable()
export class DogsService {
    private posts: Array<DogsModel> = [];
    private readonly logger = new Logger(DogsService.name);

    public findAll(): Array<DogsModel> {
        this.logger.log(`Returning array of Dogs`);
        return this.posts;
    }

}
