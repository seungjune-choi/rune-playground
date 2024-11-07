import { CategoryRepository } from './category.repository';
import { testDataSource } from '../../fixture';
import { Category } from '../entities';
import { randomUUID } from 'node:crypto';

describe(CategoryRepository.name, () => {
  const sut = new CategoryRepository(testDataSource);

  afterAll(async () => {
    await testDataSource.$disconnect();
  });

  describe('save', () => {
    afterAll(async () => {
      await testDataSource.$query`TRUNCATE TABLE categories RESTART IDENTITY CASCADE`;
    });

    it('should save category', async () => {
      // Arrange
      const category = Category.new({ name: randomUUID() });

      // Act
      const result = await sut.save(category);

      // Assert
      expect(result).toMatchObject({
        id: expect.any(Number),
        name: category.name,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        deletedAt: null,
      });
    });
  });
});
