import { Injectable } from '@libs/decorators';
import { UserRepository } from '@backend/persistence';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public exists(email: string, password: string): Promise<boolean> {
    return this.userRepository.exists(email, password);
  }
}