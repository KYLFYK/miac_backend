import { hash } from 'bcrypt';

const SALT_ROUNDS = 10;

export async function createHash(data: string | Buffer): Promise<string> {
  return hash(data, SALT_ROUNDS);
}
