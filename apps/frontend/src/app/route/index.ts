import { createRouter } from '@rune-ts/server';
import { MainRoute } from '../../pages/main';

type RouterType = typeof MainRoute;

export const ClientRouter = createRouter<RouterType>({
  ...MainRoute,
});
