"use client"

import crypto from 'crypto';

// export default function generateSecretKey(length = 32) {
//     const array:any = new Uint8Array(length);
//     crypto.getRandomValues(array);
//     return btoa(String.fromCharCode.apply(null, array));
//   }

  export default function generateSecretKey(length = 32) {
    return crypto.randomBytes(length).toString('base64');
  }