import { Injectable } from '@nestjs/common';

@Injectable()
export class CommerceService {
  findAll() {
    // TODO: implement list logic
    return [];
  }

  findOne(id: number) {
    // TODO: implement findOne logic
    return { id };
  }

  create(data: any) {
    // TODO: implement create logic
    return data;
  }
}
