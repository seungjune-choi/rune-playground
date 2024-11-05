import { RequestMethod } from '@libs/enums';
import { append, filter, pipe, toArray } from '@fxts/core';
import { IRequest } from '@libs/decorators/rest/request.interface';

export const REQUEST_METHOD_TOKEN = Symbol('__request_method__');

export interface RequestMethodOption {
  method: RequestMethod;

  path?: string;
}

export const requestMethod = ({ method, path = ''}: RequestMethodOption): MethodDecorator =>
  (target, key) => {
    const metadata = pipe(
      (Reflect.getMetadata(REQUEST_METHOD_TOKEN, target.constructor) || []) as IRequest[],
      filter((req) => !(req.method === method && req.path === path)),
      append({ method, path, methodName: key }),
      toArray,
    );

    Reflect.defineMetadata(REQUEST_METHOD_TOKEN, metadata, target.constructor);
  };

const createRequestMethodDecorator =
  (method: RequestMethod) =>(path?: string) =>
    requestMethod({ method, path });

export const Get = createRequestMethodDecorator(RequestMethod.GET);
export const Post = createRequestMethodDecorator(RequestMethod.POST);
export const Put = createRequestMethodDecorator(RequestMethod.PUT);
export const Patch = createRequestMethodDecorator(RequestMethod.PATCH);
export const Delete = createRequestMethodDecorator(RequestMethod.DELETE);
export const Options = createRequestMethodDecorator(RequestMethod.OPTIONS);
