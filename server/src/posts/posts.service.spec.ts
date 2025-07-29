import { Test, TestingModule } from '@nestjs/testing'
import { NotFoundException } from '@nestjs/common'
import { PostsService } from './posts.service'
import { PrismaService } from '../prisma/prisma.service'

describe('PostsService', () => {
  let service: PostsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: PrismaService,
          useValue: {
            post: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    // Rails equivalent: allow(Post).to recieve(:all).and_return([]) in RSpec
    service = module.get<PostsService>(PostsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create and return a new post', async () => {
      // Arrange
      const createData = { title: 'New Post', content: 'New content', published: false };
      const mockCreatedPost = { id: 1, ...createData, createdAt: new Date(), updatedAt: new Date() };
      (prismaService.post.create as jest.Mock).mockResolvedValue(mockCreatedPost);

      // Act
      const result = await service.create(createData);

      // Assert
      expect(result).toEqual(mockCreatedPost);
      expect(prismaService.post.create).toHaveBeenCalledWith({ data: createData });
    });
  });

  describe('findAll', () => {
      it('should return an array of posts', async () => {
        // Arrange
        const mockPosts = [
          { id: 1, title: 'Test post 1', content: 'Content 1', published: false },
          { id: 2, title: 'Test post 2', content: 'Content 2', published: true },
        ];
        (prismaService.post.findMany as jest.Mock).mockResolvedValue(mockPosts); // this is like allow(Post).to receive(:all).and_return(posts)

        // Act
        const result = await service.findAll();

        // Assert
        expect(result).toEqual(mockPosts);
        expect(prismaService.post.findMany).toHaveBeenCalledTimes(1);
      });

      it('should throw an error when database fails', async () => {
        // Arrange
        const errorMessage = 'Database connection failed';
        (prismaService.post.findMany as jest.Mock).mockRejectedValue(new Error(errorMessage)); // throw error instead of return results, like allow(Post).to receive(:all).and_raise(ActiveRecord::ConnectionNotEstablished)

        // Act & Assert
        await expect(service.findAll()).rejects.toThrow(errorMessage);
      });
  });

  describe('findOne', () => {
    it('should return a post when found', async () => {
      // Arrange
      const mockPost = {id: 1, title: 'Test post 1', content: 'Content 1', published: false };
      (prismaService.post.findUnique as jest.Mock).mockResolvedValue(mockPost);

      // Act
      const result = await service.findOne(1);

      // Assert
      expect(result).toEqual(mockPost);
      expect(prismaService.post.findUnique).toHaveBeenCalledWith({ where: {
        id: 1 } });
    })

    it('should throw NotFoundException when post not found', async () => {
      // Arrange
      (prismaService.post.findUnique as jest.Mock).mockResolvedValue(null);

      // Act & Assert
      await expect(service.findOne(999)).rejects.toThrow('Post with ID 999 not found');
      expect(prismaService.post.findUnique).toHaveBeenCalledWith({ where: { id: 999 } });
    });
  });

  describe('update', () => {
    it('should update and return the updated post', async () => {
      // Arrange
      const updateData = { title: 'Updated title', content: 'Updated content' };
      const mockUpdatedPost = { id: 1, ...updateData, published: false, createdAt: new Date(), updatedAt: new Date() };
      (prismaService.post.update as jest.Mock).mockResolvedValue(mockUpdatedPost);

      // Act
      const result = await service.update(1, updateData);

      // Assert
      expect(result).toEqual(mockUpdatedPost);
      expect(prismaService.post.update).toHaveBeenCalledWith({ where: { id: 1 }, data: updateData });
    });
  });

  describe('remove', () => {
    it('should delete and return the deleted post', async () => {
      // Arrange
      const mockDeletedPost = { id: 1, title: 'Post to delete', content: 'Content', published: false };
      (prismaService.post.delete as jest.Mock).mockResolvedValue(mockDeletedPost);

      // Act
      const result = await service.remove(1);

      // Assert
      expect(result).toEqual(mockDeletedPost);
      expect(prismaService.post.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    })
  })
});