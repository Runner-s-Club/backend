import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CommerceService } from './commerce.service';

@Controller('commerce')
export class CommerceController {
  constructor(private readonly commerceService: CommerceService) {}

  @Get()
  findAll() {
    return this.commerceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commerceService.findOne(+id);
  }

  @Post()
  create(@Body() body: any) {
    return this.commerceService.create(body);
  }
}
