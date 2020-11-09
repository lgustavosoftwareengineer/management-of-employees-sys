/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import sha512 from 'crypto-js/sha512';

function hashingFunction(BeHashValue: string): string {
  const result = sha512(BeHashValue).toString();
  return result;
}

export default hashingFunction;
