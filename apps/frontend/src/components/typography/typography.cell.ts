import { html, View } from 'rune-ts';

export interface TypographyProps {
  text: string;
}

export class Typography extends View<TypographyProps> {
  override template() {
    return html`<p>${this.data.text}</p>`;
  }
}
