import { describe, expect, test } from "vitest";
import { RsaKeyPair, SymmetricKey } from "./crypto";

describe('rsa', () => {
    test('gen', () => {
        for (let i = 0; i < 100; i++) {
            RsaKeyPair.generate();
        }
    })

    test('rsa', () => {
        let alice = RsaKeyPair.generate();
        let bob = RsaKeyPair.generate();

        for (let i = 0; i < 100; i++) {
            let message = BigInt(i);
            let ciphertext = bob.publicKey.encrypt(message);
            let deciphered = bob.decrypt(ciphertext);
            expect(deciphered).equal(message);
        }
    })

    test('strings', () => {
        let alice = RsaKeyPair.generate();
        let bob = RsaKeyPair.generate();

        let message = "afaf";
        let ciphertext = bob.publicKey.encryptString(message);
        console.log(bob.publicKey, ciphertext);
        let deciphered = bob.decryptString(ciphertext);
        expect(deciphered).equal(message);
    })
})

describe('symmetric', () => {
    test('works', () => {
        let secret = new SymmetricKey('foo👻bar');
        let message = new Uint8ClampedArray(256);
        for (let i = 0; i < 256; i++) {
            message[i] = i;
        }
        secret.apply(message);
        expect(message.slice(0, 5)).not.equal(new Uint8ClampedArray([0, 1, 2, 3, 4]))
        secret.apply(message);
        for (let i = 0; i < 256; i++) {
            expect(message[i]).equal(i);
        }
    })
})
