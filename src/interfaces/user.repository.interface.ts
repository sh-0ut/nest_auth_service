export interface IUserRepository {
  findUser(username: string): Promise<any>;
  createUser(user: any): Promise<any>;
}