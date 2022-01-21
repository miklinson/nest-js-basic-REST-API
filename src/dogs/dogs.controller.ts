import { Controller, Get } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsModel } from './dogs.interface';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}
  @Get()
  findAll(): Array<DogsModel> {
    return this.dogsService.findAll();
  }
}
