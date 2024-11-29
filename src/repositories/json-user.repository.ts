import { IUserRepository } from '../interfaces/user.repository.interface';
import { JsonDB, Config as JsonDBConfig } from 'node-json-db';

export class JsonUserRepository implements IUserRepository {
  private userDb: JsonDB;

  constructor() {
    this.userDb = new JsonDB(new JsonDBConfig('localdb', true, false, '/'));
  }

  async findUser(username: string): Promise<any> {
    try {
      return this.userDb.getData(`/users/${username}`);
    } catch (error) {
      return null;
    }
  }

  async createUser(user: any): Promise<any> {
    this.userDb.push(`/users/${user.username}`, user);
    return user;
  }
}