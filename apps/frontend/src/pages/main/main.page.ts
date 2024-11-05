import { html, Page } from 'rune-ts';
import type { RenderHandlerType } from '../../../../../packages/types/renderHandlerType';
import { type LayoutData, MetaView } from '@rune-ts/server';
import { MainTemplate } from '../../templates/main';
import { MockUserRepository } from '../../repositories/users/mock.user.repository';

export class MainPage extends Page<object> {
  private _userRepository = new MockUserRepository();
  
  override template() {
    return html` <div>${new MainTemplate(this._userRepository)}</div> `;
  }
}

export const MainRoute = {
  '/': MainPage,
};

export const mainRenderHandler: RenderHandlerType<typeof MainPage> = (createCurrentPage) => {
  return (req, res, next) => {
    const layoutData: LayoutData = {
      ...res.locals.layoutData,
    };

    res.send(new MetaView(createCurrentPage({}, { is_mobile: false }), layoutData).toHtml());
  };
};
