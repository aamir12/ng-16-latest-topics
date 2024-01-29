import { Injectable } from '@angular/core';
import * as cryptoJS from 'crypto-js';

import { environment } from '../../../environments/environment.development';

/**
 * Steps:
 * npm i crypto-js
 * npm i --save-dev @types/crypto-js
 */

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private secretKey = environment.CryptoKey;

  encrypt(id: string): string {
    const encryptedId = cryptoJS.AES.encrypt(id, this.secretKey).toString();
    return encodeURIComponent(encryptedId);
  }

  decrypt(encryptedId: string): string | null {
    let decryptedId;
    try {
      const encryptedStr = decodeURIComponent(encryptedId);
      decryptedId = cryptoJS.AES.decrypt(encryptedStr, this.secretKey).toString(cryptoJS.enc.Utf8);
    } catch (error) {
      decryptedId = null;
    }
    
    return decryptedId;
  }

  

}

 
//U2FsdGVkX18of8wXGQNSYpz7BfHRHkYoPuGn%252BrshQso%253D