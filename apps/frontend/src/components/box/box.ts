import { html, on, View } from 'rune-ts';

export class Box extends View<object> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private readonly views: View<any>[]) {
    super({});
  }

  override template() {
    return html`<div>test</div>`;
  }

  @on('click')
  private _onClick() {
    console.log('Box clicked');
  }
}
