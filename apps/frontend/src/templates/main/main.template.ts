import { html, View } from 'rune-ts';
import type { IUserRepository } from '../../repositories/users';
import { TextField } from '../../components';

export class MainTemplate extends View<object> {
  private _emailFieldProps = { label: 'email', value: '' };
  private _passwordFieldProps = { label: 'password', value: '', password: true };

  constructor(private readonly userRepository: IUserRepository) {
    super({});
  }

  override template() {
    return html`
      <div>
        ${new TextField(this._emailFieldProps)} ${new TextField(this._passwordFieldProps)}
        <button>Login</button>
      </div>
    `;
  }

  protected override onRender() {
    const button = this.element().querySelector('button')!;
    button.addEventListener('click', async (e) => {
      e.preventDefault();
      button.disabled = true;
      await this.userRepository
        .signIn({
          email: this._emailFieldProps.value,
          password: this._passwordFieldProps.value,
        })
        .then((res) => console.log(res.message));
      button.disabled = false;
    });
  }
}