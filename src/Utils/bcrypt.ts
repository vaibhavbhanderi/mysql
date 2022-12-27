import * as bcrypt from 'bcrypt';

export function encodepassword(password: string) {
  const Salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, Salt);

}