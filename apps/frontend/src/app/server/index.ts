import { app } from '@rune-ts/server';
import { ClientRouter } from '../route';
import { faviconInterceptor } from './middlewares/favicon.interceptor';
import { mainRenderHandler } from '../../pages/main';

const server = app();

server.use(faviconInterceptor);

server.get(ClientRouter['/'].toString(), mainRenderHandler(ClientRouter['/']));
