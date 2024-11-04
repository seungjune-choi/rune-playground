import { singleton } from 'tsyringe';

export function Controller(path = '/'): ClassDecorator {
  return (target: any) => {
    singleton()(target);
  };
}
