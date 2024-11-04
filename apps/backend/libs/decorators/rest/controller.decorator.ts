import { container, singleton } from 'tsyringe';
import { Path } from '@libs/types/path';
import { forEach, map, peek, pipe } from '@fxts/core';
import { REQUEST_METHOD_TOKEN } from '@libs/decorators/rest/request-method.decorator';
import { IRequest } from '@libs/decorators/rest/request.interface';
import { appRouter } from '@libs/appRouter';
import * as console from 'node:console';

export function Controller<T extends string>(path?: Path<T>): ClassDecorator {
  return (target: any) => {
    singleton()(target);
    const instance = container.resolve<any>(target);

    pipe(
      (Reflect.getMetadata(REQUEST_METHOD_TOKEN, target) || []) as IRequest[],
      map((req) => ({
        ...req,
        path: path ? `${path}${req.path}` : req.path,
      })),
      peek((req) =>
        console.log(
          `[INFO] mapping ${req.method.toUpperCase()}:${req.path} to ${target.name}.${req.methodName.toString()}`,
        ),
      ),
      forEach((req) => {
        appRouter[req.method](req.path, asyncHandler(instance[req.methodName].bind(instance)));
      }),
    );
  };
}

// eslint-disable-next-line @typescript-eslint/ban-types
function asyncHandler(handler: Function) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return async (req: any, res: any, next: Function) => {
    try {
      const result = await handler(req, res, next);
      if (!res.headersSent) {
        res.json(result);
      }
    } catch (error) {
      next(error); // Pass errors to Express error handlers
    }
  };
}
