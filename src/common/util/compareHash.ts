import { compare } from 'bcrypt';

export async function compareHash(data: string | Buffer, hash: string): Promise<boolean> {
  return compare(data, hash);
}
