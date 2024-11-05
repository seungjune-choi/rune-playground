import { Body, Controller, Post, UseMiddleware } from '@libs/decorators';
import { UserService } from '@backend/usecase';
import { ResponseEntity } from '@libs/rest';
import { SignInRequest } from '@backend/presentation/dto';
import { BodyValidator } from '@libs/middlewares';

@Controller('/users/v1')
export class UserControllerV1 {
  constructor(private readonly userService: UserService) {}

  @Post('sign-in')
  @UseMiddleware(BodyValidator(SignInRequest))
  public async signIn(@Body() body: SignInRequest) {
    const { email, password } = body;
    return await this.userService
      .exists(email, password)
      .then((exists) => (exists ? ResponseEntity.ok(exists) : ResponseEntity.unauthorized()))
      .catch((error) => ResponseEntity.internalServerError(error));
  }
}