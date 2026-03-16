import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TryonService } from './tryon.service';

@Controller('tryon')
export class TryonController {
  constructor(private readonly tryonService: TryonService) {}

  @Get()
  findAll() {
    return this.tryonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tryonService.findOne(+id);
  }

  @Post()
  create(@Body() body: any) {
    return this.tryonService.create(body);
  }
}
