import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsModel } from './dogs.interface';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}
  @Get()
  public findAll(): Array<DogsModel> {
    return this.dogsService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id', ParseIntPipe) id: number): DogsModel {
    return this.dogsService.findOne(id);
  } 

  @Post()
  public create(@Body() dog: DogsModel): DogsModel {
    return this.dogsService.create(dog);
  }

  @Delete(':id')
  public delete(@Param('id', ParseIntPipe) id: number): void {
    this.dogsService.delete(id);
  }
}
