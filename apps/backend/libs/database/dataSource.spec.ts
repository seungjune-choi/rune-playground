import { DataSource } from './dataSource';

describe('DataSource', () => {
  const sut: DataSource = new DataSource({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres',
  });

  beforeAll(async () => {
    await sut.$connect();
  });

  afterAll(async () => {
    await sut.$disconnect();
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('$query', () => {
    it('쿼리 정상 동작', async () => {
      const [result] = await sut.$query<{ id: number }>`SELECT 1 as id`;
      expect(result).toEqual({ id: 1 });
    });
  });

  describe('$values', () => {
    afterAll(async () => {
      await sut.$query`TRUNCATE TABLE users RESTART IDENTITY`;
    });

    it('insert values', async () => {
      // Arrange
      const user = {
        email: 'test',
        password: 'test',
        is_admin: false,
      };

      // Act
      await sut.$query`INSERT INTO users ${sut.$values(user)}`;

      // Assert
      const [res] = await sut.$query`SELECT * FROM users WHERE email LIKE 'test%'`;
      expect(res).toMatchObject({ email: 'test', password: 'test', is_admin: false });
    });
  });

  describe('$transaction / callback', () => {
    afterAll(async () => {
      await sut.$query`TRUNCATE TABLE users RESTART IDENTITY`;
    });

    it('트랜잭션 내부에서 쿼리 실행', async () => {
      await sut.$transaction(async (query) => {
        const [res] = await query`SELECT 1 as id`;
        expect(res).toEqual({ id: 1 });
      });
    });

    it('트랜잭션 내부에서 에러 발생 시 롤백', async () => {
      // Arrange
      const user = {
        email: 'test',
        password: 'test',
        is_admin: false,
      };

      // Act
      try {
        await sut.$transaction(async (query) => {
          await query`INSERT INTO users ${sut.$values(user)}`;
          throw new Error('unknown error');
        });
      } catch (error) {
        // Assert
        const [res] = await sut.$query`SELECT * FROM users WHERE email LIKE 'test'`;
        expect(res).toBeUndefined();
      }
    });
  });

  describe('$transaction / runner', () => {
    afterAll(async () => {
      await sut.$query`TRUNCATE TABLE users RESTART IDENTITY`;
    });

    it('트랜잭션 내부에서 에러 발생 시 롤백', async () => {
      // Arrange
      const user = {
        email: 'test',
        password: 'test',
        is_admin: false,
      };

      // Act
      const runner = await sut.$transaction();
      await runner.$query`INSERT INTO users ${sut.$values(user)}`;
      await runner.$rollback();

      // Assert
      const [res] = await sut.$query`SELECT * FROM users WHERE email LIKE 'test%'`;
      expect(res).toBeUndefined();
    });
  });
});
