import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { title: string; content?: string; published?: boolean }) {
    return this.prisma.post.create({ data });
  }

  async findAll() {
    return this.prisma.post.findMany();
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({ where: { id } });

    if(!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  async update(id: number, data: { title?: string; content?: string; published?: boolean }) {
    return this.prisma.post.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.post.delete({ where: { id } });
  }
}