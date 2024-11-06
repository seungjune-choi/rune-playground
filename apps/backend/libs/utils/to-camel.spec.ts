import { toCamelDeep } from './to-camel';

it('snake to camel', () => {
  // Arrange
  const snakeObj = {
    id: 1,
    name: 'Product 1',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  };

  // Act
  const camelObj = toCamelDeep(snakeObj);

  // Assert
  expect(camelObj).toEqual({
    id: 1,
    name: 'Product 1',
    createdAt: snakeObj.created_at,
    updatedAt: snakeObj.updated_at,
    deletedAt: null,
  });
});

it('nested snake to camel', () => {
  // Arrange
  const snakeObj = {
    id: 1,
    name: 'Product 1',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
    category: {
      id: 1,
      name: 'Category 1',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
  };

  // Act
  const camelObj = toCamelDeep(snakeObj);

  // Assert
  expect(camelObj).toEqual({
    id: 1,
    name: 'Product 1',
    createdAt: snakeObj.created_at,
    updatedAt: snakeObj.updated_at,
    deletedAt: null,
    category: {
      id: 1,
      name: 'Category 1',
      createdAt: snakeObj.category.created_at,
      updatedAt: snakeObj.category.updated_at,
      deletedAt: null,
    },
  });
});
