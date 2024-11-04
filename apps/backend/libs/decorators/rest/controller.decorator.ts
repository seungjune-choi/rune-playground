import { container, singleton } from 'tsyringe';
import { Path } from '@libs/types/path';
import { forEach, map, peek, pipe } from '@fxts/core';
import { REQUEST_METHOD_TOKEN } from '@libs/decorators/rest/request-method.decorator';
import { IRequest } from '@libs/decorators/rest/request.interface';
import { appRouter } from '@libs/appRouter';

export function Controller<T extends string>(path: Path<T>): ClassDecorator {
  return (target: any) => {
    singleton()(target);
    const instance = container.resolve<any>(target);

    pipe(
      (Reflect.getMetadata(REQUEST_METHOD_TOKEN, target) || []) as IRequest[],
      map((req) => ({
        ...req,
        path: `${path}${req.path}`,
      })),
      peek((req) =>
        console.log(
          `[INFO] mapping ${req.method.toUpperCase()}:${req.path} to ${target.name}.${req.methodName.toString()}`,
        ),
      ),
      forEach((req) => {
        appRouter[req.method](req.path, instance[req.methodName].bind(instance));
      }),
    );
  };
}
