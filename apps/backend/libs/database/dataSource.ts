import * as FxSQL from 'fxsql';
import * as console from 'node:console';

interface DataSourceConnectOptions {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

export const DATA_SOURCE = Symbol('__DATA_SOURCE__');

export class DataSource {
  private _pool: FxSQL.PostgreSQL.Pool | null = null;

  constructor(private readonly options: DataSourceConnectOptions) {}

  public async $connect() {
    this._pool = await FxSQL.PostgreSQL.CONNECT({
      host: this.options.host,
      port: this.options.port,
      user: this.options.user,
      password: this.options.password,
      database: this.options.database,
    });

    console.log('Connected to database');
  }

  public async $disconnect() {
    await this._pool?.END();
  }

  public $query = <T>(str: TemplateStringsArray, ...values: unknown[]) =>
    this._pool?.QUERY(str, ...values) as Promise<T[]>;

  public $values = (...values: unknown[]) => this._pool.VALUES(values);

  public $transaction(callback: (tx: DataSource['$query']) => Promise<void>): Promise<void>;
  public $transaction(): Promise<{
    $query: DataSource['$query'];
    $commit: () => Promise<void>;
    $rollback: () => Promise<void>;
  }>;
  public $transaction(callback?: (tx: DataSource['$query']) => Promise<void>) {
    return callback ? this._transactionWithCallback(callback) : this._transaction();
  }

  public _transactionWithCallback = async (callback: (tx: DataSource['$query']) => Promise<void>) => {
    const { QUERY, COMMIT, ROLLBACK } = await this._pool.TRANSACTION();
    try {
      await callback(QUERY);
      await COMMIT();
    } catch (error) {
      await ROLLBACK();
      throw error;
    }
  };

  private _transaction = async () => {
    const { QUERY, COMMIT, ROLLBACK } = await this._pool.TRANSACTION();
    return {
      $query: QUERY,
      $commit: COMMIT,
      $rollback: ROLLBACK,
    };
  };
}
