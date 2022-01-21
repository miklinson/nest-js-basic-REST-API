import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsModel } from './dogs.interface';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';

@Controller('dogs')
@ApiTags('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Get()
  @ApiOkResponse({description: 'Dogs retrieved successfully'})
  public findAll(): Array<DogsModel> {
    return this.dogsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({description: 'Dog retrieved successfully'})
  @ApiNotFoundResponse({description: 'Dog not found'})
  public findOne(@Param('id', ParseIntPipe) id: number): DogsModel {
    return this.dogsService.findOne(id);
  } 

  @Post()
  @ApiCreatedResponse({description: 'Dog created successfully'})
  @ApiUnprocessableEntityResponse({description: 'Dog name already exists.'})
  public create(@Body() dog: DogsModel): DogsModel {
    return this.dogsService.create(dog);
  }

  @Delete(':id')
  @ApiOkResponse({description: 'Dog record deleted successfully'})
  @ApiNotFoundResponse({description: 'Dog not found'})
  public delete(@Param('id', ParseIntPipe) id: number): void {
    this.dogsService.delete(id);
  }

  @Put(':id')
  @ApiOkResponse({description: 'Dog updated successfully'})
  @ApiNotFoundResponse({description: 'Dog not found'})
  @ApiUnprocessableEntityResponse({description: 'Dog name already exists.'})
  public update(@Param('id', ParseIntPipe) id: number, @Body() dog: DogsModel): DogsModel {
    return this.dogsService.update(id, dog);
  }
}
