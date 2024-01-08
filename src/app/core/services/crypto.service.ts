import { Injectable } from '@angular/core';
import * as cryptoJS from 'crypto-js';

import { environment } from '../../../environments/environment.development';

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
      const decodedStr = decodeURIComponent(encryptedId);
      decryptedId = cryptoJS.AES.decrypt(decodedStr, this.secretKey).toString(cryptoJS.enc.Utf8);
    } catch (error) {
      decryptedId = null;
    }
    
    return decryptedId;
  }

}
