export interface BaseScheme<I extends string | number> {
  id: I;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
