import { toSnakeDeep } from './to-snake';

it('camel to snake', () => {
  // Arrange
  const camelObj = {
    id: 1,
    name: 'Product 1',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  // Act
  const snakeObj = toSnakeDeep(camelObj);

  // Assert
  expect(snakeObj).toEqual({
    id: 1,
    name: 'Product 1',
    created_at: camelObj.createdAt,
    updated_at: camelObj.updatedAt,
    deleted_at: null,
  });
});

it('nested camel to snake', () => {
  // Arrange
  const camelObj = {
    id: 1,
    name: 'Product 1',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    category: {
      id: 1,
      name: 'Category 1',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
  };

  // Act
  const snakeObj = toSnakeDeep(camelObj);

  // Assert
  expect(snakeObj).toEqual({
    id: 1,
    name: 'Product 1',
    created_at: camelObj.createdAt,
    updated_at: camelObj.updatedAt,
    deleted_at: null,
    category: {
      id: 1,
      name: 'Category 1',
      created_at: camelObj.category.createdAt,
      updated_at: camelObj.category.updatedAt,
      deleted_at: null,
    },
  });
});
