import * as uuid from 'uuid';

export function generateUid(): string {
  return uuid.v4();
}
