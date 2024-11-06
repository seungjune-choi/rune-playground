import { CategoryRepository } from './category.repository';
import { testDataSource } from '../../fixture';

describe(CategoryRepository.name, () => {
  const sut = new CategoryRepository(testDataSource);

  afterAll(async () => {
    await testDataSource.$disconnect();
  });

  describe('save', () => {
    it('should be defined', () => {
      expect(sut.save).toBeDefined();
    });

    it('should save category', async () => {
      // Arrange
      const category = { name: 'adsfsadfasdfsadf' };

      // Act
      const result = await sut.save(category);

      // Assert
      expect(result).toMatchObject(category);
    });
  });
});
