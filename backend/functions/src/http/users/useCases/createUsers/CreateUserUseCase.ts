import { ApiError } from '@burand/functions/exceptions';
import { SetDocument } from '@burand/functions/typings';
import { singleton } from 'tsyringe';

import { UserType } from '@enums/UserType.js';
import { User } from '@models/User.js';
// import { PasswordProvider } from '@providers/PasswordProvider.js';
import { AuthRepository } from '@repositories/AuthRepository.js';
import { UserRepository } from '@repositories/UserRepository.js';
import { UserParams } from './CreateUserValidation.js';

@singleton()
export class CreateUserUseCase {
  constructor(
    private _user: UserRepository,
    private _auth: AuthRepository
    // ,private _password: PasswordProvider
  ) {}

  async execute({ email, password, name, document, documentType, phone }: UserParams): Promise<string> {
    let id = null;

    try {
      // const password = this._password.defaultPassword;

      id = await this._auth.create({
        email,
        password,
        displayName: name,
        phoneNumber: phone
      });

      const userData: SetDocument<User> = {
        id,
        name,
        email,
        document,
        documentType,
        phone,
        active: true,
        avatar: null,
        type: UserType.USER,
        lastAccess: null
      };

      await this._user.set(userData);

      await this._auth.setCustomClaims(id, {
        type: UserType.USER
      });

      return id;
    } catch {
      if (id) {
        await this._auth.delete(id);
      }
      // console.error(error);

      throw new ApiError('User create failed', 'application/create-user', 500);
    }
  }
}
