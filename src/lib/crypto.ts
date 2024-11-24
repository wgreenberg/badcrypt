const Q_OPTIONS = [19, 23, 29, 31, 37, 41, 43, 47, 53];
const P_OPTIONS = [59, 61, 67, 71, 73, 79, 83, 89, 97];

function getRandomParams(): [number, number] {
    const q = Q_OPTIONS[getRandomInt(0, Q_OPTIONS.length - 1)];
    const p = P_OPTIONS[getRandomInt(0, P_OPTIONS.length - 1)];
    return [q, p];
}

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gcd(a: number, b: number): number {
  if (b === 0) {
    return a;
  } else {
    return gcd(b, a % b);
  }
}

function modInverse(a: bigint, m: bigint): bigint {
  a = (a % m + m) % m
  if (!a || m < 2) {
      throw Error('bad')
  }
  // find the gcd
  const s = []
  let b = m
  while(b) {
    [a, b] = [b, a % b]
    s.push({a, b})
  }
  if (a !== 1n) {
      throw Error('bad')
  }
  // find the inverse
  let x = 1n
  let y = 0n
  for(let i = s.length - 2; i >= 0; --i) {
    [x, y] = [y,  x - y * BigInt(s[i].a / s[i].b)]
  }
  return (y % m + m) % m
}

function modexp(base: bigint, exponent: bigint, modulus: bigint): bigint {
  if (exponent === 0n) return 1n;
  if (exponent < 0n) {
    base = modInverse(base, modulus);
    exponent = -exponent;
  }

  let result = 1n;
  while (exponent > 0n) {
    if (exponent % 2n === 1n) {
      result = (result * base) % modulus;
    }
    exponent = exponent / 2n;
    base = (base * base) % modulus;
  }

  return result;
}

export class RsaPublicKey {
    constructor(public n: number, public e: number) {}

    public static fromString(str: string): RsaPublicKey {
        const key = JSON.parse(str);
        return new RsaPublicKey(key.n, key.e);
    }

    public encrypt(message: bigint): bigint {
        return modexp(message, BigInt(this.e), BigInt(this.n));
    }

    public encryptString(message: string): string {
        const encoder = new TextEncoder();
        const bigInt = bigIntFromByteArray(encoder.encode(message));
        console.log(bigInt);
        return base64EncodeBigInt(this.encrypt(bigInt));
    }
}

function base64EncodeBigInt(n: bigint): string {
  if (n === 0n) return "A";

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let result = "";
  let sign = n < 0n ? "-" : "";
  n = n < 0n ? -n : n;

  while (n > 0n) {
    result = alphabet.charAt(Number(n % 64n)) + result;
    n = n / 64n;
  }

  return sign + result;
}

function base64DecodeBigInt(str: string): bigint {
  if (str === "A") return 0n;

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let result = 0n;
  let sign = 1n;
  if (str.charAt(0) === "-") {
    sign = -1n;
    str = str.slice(1);
  }

  for (let i = 0; i < str.length; i++) {
    result = result * 64n + BigInt(alphabet.indexOf(str.charAt(i)));
  }

  return sign * result;
}

function bigIntFromByteArray(bytes: Uint8Array) {
  let result = 0n;
  for (let i = 0; i < bytes.length; i++) {
    result = (result << 8n) + BigInt(bytes[i]);
  }
  return result;
}

function bigIntToByteArray(bigInt: bigint): Uint8Array {
  const hex = bigInt.toString(16);
  const len = hex.length / 2;
  const byteArray = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    byteArray[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }

  return byteArray;
}

function base64ToBytes(base64: string): Uint8Array {
  const binString = atob(base64);
  return Uint8Array.from(binString, (m, k) => m.codePointAt(0)!);
}

function bytesToBase64(bytes: Uint8Array): string {
  const binString = Array.from(bytes, (byte) =>
    String.fromCodePoint(byte),
  ).join("");
  return btoa(binString);
}

export class RsaKeyPair {
    constructor(public publicKey: RsaPublicKey, public privateKey: number) {
    }

    public static generate(): RsaKeyPair {
        const [q, p] = getRandomParams();
        const n = q * p;
        const phi_n = (q - 1) * (p - 1);
        if (phi_n < 256) {
            throw new Error(`phi too small`);
        }

        let publicKey;
        while (true) {
            const e = getRandomInt(3, phi_n);
            if (gcd(e, phi_n) === 1) {
                publicKey = new RsaPublicKey(n, e);
                break;
            }
        }
        const privateKey = modInverse(BigInt(publicKey.e), BigInt(phi_n));
        if (Number.isNaN(privateKey)) {
            throw new Error(`NaN private key`);
        }

        return new RsaKeyPair(publicKey, Number(privateKey));
    }

    public static fromString(str: string): RsaKeyPair {
        const props = JSON.parse(str);
        return new RsaKeyPair(props.publicKey, props.privateKey);
    }

    public toString(): string {
        return JSON.stringify({
            publicKey: this.publicKey,
            privateKey: this.privateKey,
        });
    }

    public decrypt(message: bigint): bigint {
        return modexp(message, BigInt(this.privateKey), BigInt(this.publicKey.n));
    }

    public decryptString(ciphertext: string): string {
        const decoder = new TextDecoder('utf-8');
        const bigInt = base64DecodeBigInt(ciphertext);
        console.log(ciphertext, bigInt);
        let bytes = bigIntToByteArray(this.decrypt(bigInt));
        return decoder.decode(bytes);
    }
}

export class Rng {
    private originalSeed: number;
    private seed: number;

    constructor(seed: number) {
        this.originalSeed = this.seed = seed;
        this.reset();
    }

    public next(): number {
        return this.seed = this.seed * 16807 % 2147483647;
    }

    public reset() {
        this.seed = this.originalSeed % 2147483647;
        if (this.seed <= 0) this.seed += 2147483646;
    }
}

export class SymmetricKey {
    public secretBytes: Uint8Array;
    private rng: Rng;
    constructor(public secret: string) {
        const encoder = new TextEncoder();
        this.secretBytes = encoder.encode(secret);
        let x = 1;
        for (const byte of this.secretBytes) {
            x *= byte;
        }
        this.rng = new Rng(x);
    }

    public apply(buf: Uint8ClampedArray) {
        this.rng.reset();
        for (let i = 0; i < buf.length; i++) {
            buf[i] = buf[i] ^ this.getSecretByte(i);
        }
    }

    private getSecretByte(index: number): number {
        // return this.secretBytes[index % this.secretBytes.length];
        return this.rng.next() % 255;
    }
}
