import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService);
  });

  describe('create', () => {
    it('should create a post and return 201', async () => {
      // Arrange
      const createDto = { title: 'New Post', content: 'Content', published: false };
      const mockCreatedPost = { id: 1, ...createDto, createdAt: new Date(), updatedAt: new Date() };
      (service.create as jest.Mock).mockResolvedValue(mockCreatedPost);

      // Act
      const result = await controller.create(createDto);

      // Assert
      expect(result).toEqual(mockCreatedPost);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('should return all posts', async () => {
      // Arrange
      const mockPosts = [{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }];
      (service.findAll as jest.Mock).mockResolvedValue(mockPosts);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toEqual(mockPosts);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single post', async () => {
      // Arrange
      const postId = 1;
      const mockPost = { id: 1, title: 'Single Post', content: 'Content' };
      (service.findOne as jest.Mock).mockResolvedValue(mockPost);

      // Act
      const result = await controller.findOne(postId);

      //Assert
      expect(result).toEqual(mockPost);
      expect(service.findOne).toHaveBeenCalledWith(postId);
    });
  });

  describe('update', () => {
    it('should update a post and return it', async () => {
      // Arrange
      const postId = 1;
      const updateDto = { title: 'Updated Post', published: true };
      const mockUpdatedPost = { id: 1, ...updateDto, content: 'Content', createdAt: new Date(), updatedAt: new Date() };
      (service.update as jest.Mock).mockResolvedValue(mockUpdatedPost);

      // Act
      const result = await controller.update(postId, updateDto);

      // Assert
      expect(result).toEqual(mockUpdatedPost);
      expect(service.update).toHaveBeenCalledWith(postId, updateDto);
    });
  });

  describe('remove', () => {
    it('should delete a post', async () => {
      // Arrange
      const postId = 1;
      (service.remove as jest.Mock).mockResolvedValue({ message: 'Post deleted' });

      // Act
      const result = await controller.remove(postId);

      // Assert
      expect(result).toEqual({ message: 'Post deleted' });
      expect(service.remove).toHaveBeenCalledWith(postId);
    });
  });
});