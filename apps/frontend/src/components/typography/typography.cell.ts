import { html, on, View } from 'rune-ts';

export interface TypographyProps {
  text: string;
}

export class Typography extends View<TypographyProps> {
  override template() {
    return html`<p>${this.data.text}</p>`;
  }

  @on('click')
  private _onClick() {
    console.log('Typography clicked');
  }
}
