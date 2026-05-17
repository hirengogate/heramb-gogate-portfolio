// Browser-side decryption for the portfolio.
//
// Uses the Web Crypto API (PBKDF2 + AES-GCM). The function attempts to decrypt
// every encrypted blob with the supplied passcode. AES-GCM is authenticated:
// if the passcode is wrong the decrypt call throws, so there is no plaintext
// passcode comparison anywhere in this code.

import {
  ENCRYPTED_BLOBS,
  PBKDF2_ITERATIONS,
  type EncryptedBlob,
} from '../data/portfolio.encrypted';
import type { PortfolioData } from '../data/portfolio';

function base64ToBytes(base64: string): Uint8Array<ArrayBuffer> {
  const binary = atob(base64);
  const buffer = new ArrayBuffer(binary.length);
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function deriveKey(passcode: string, salt: Uint8Array<ArrayBuffer>): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(passcode),
    { name: 'PBKDF2' },
    false,
    ['deriveKey'],
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt'],
  );
}

async function tryBlob(blob: EncryptedBlob, passcode: string): Promise<string | null> {
  try {
    const salt = base64ToBytes(blob.salt);
    const iv = base64ToBytes(blob.iv);
    const ciphertext = base64ToBytes(blob.ciphertext);
    const key = await deriveKey(passcode, salt);
    const plaintext = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      ciphertext,
    );
    return new TextDecoder().decode(plaintext);
  } catch {
    return null;
  }
}

export async function unlockPortfolio(passcode: string): Promise<PortfolioData | null> {
  for (const blob of ENCRYPTED_BLOBS) {
    const json = await tryBlob(blob, passcode);
    if (json) {
      return JSON.parse(json) as PortfolioData;
    }
  }
  return null;
}
