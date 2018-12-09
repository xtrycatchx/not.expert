---
title: NodeJS Crypto with Custom Padding
date: '2017-12-04'
spoiler: Implementing a custom padding in using NodeJS's crypto library. This post uses aes-256-cbc encryption with zero padding.
---

In this post, we'll try to implement our custom padding in using NodeJS's crypto library. We will use aes-256-cbc algorithm with the input padded with zero's (0). The goal is to pad the remaining blocks with zeros if the bytes size is less than 8 before encrypting it

---

For example with the string 'hello world' being zero padded

```shell
before | 48 65 6c 6c 6f 20 77 6f | 72 6c 64
after  | 48 65 6c 6c 6f 20 77 6f | 72 6c 64 00 00 00 00 00
```
---

The code using built-in padding support of the crypto library

```js
const crypto = require('crypto');

const encrypt = (plain, key, iv) => {
  const cipher = crypto.createCipheriv('aes-256-cbc', toHexBuffer(key), toHexBuffer(iv));
  return cipher.update(Buffer.from(plain, 'utf8'), 'utf8', 'hex') + cipher.final('hex');
}

const decrypt = (encrypted, key, iv) => {
  const decipher = crypto.createDecipheriv('aes-256-cbc', toHexBuffer(key), toHexBuffer(iv));
  return decipher.update(Buffer.from(encrypted, 'hex'), 'utf8', 'utf8') + decipher.final('utf8');
}

const toHexBuffer = string => Buffer.from(string, 'hex')

const key = "1111111111111111111111111111111111111111111111111111111111111111"
const iv = "22222222222222222222222222222222"

console.log(`aes key \t${key}`)
console.log(`init vector \t${iv}`)

const plain = "Hello world"

const encrypted = encrypt(plain, key, iv)
console.log(`Encrypted \t${encrypted}`)

const decrypted = decrypt(encrypted, key, iv);
console.log(`Decrypted \t${decrypted}`)
```
Running this code results in 

**The Lambda Function**

​The content of the lambda our notifier.js will be:

```shell
Encrypted 	aca20fdc3f989b3dcc832e7001accd31
Decrypted 	Hello world
```
---

To use a custom padding, the Cipher and Decipher's setAutoPadding method must be set to false.
​And then proceed with padding the input data before doing the encryption.

---

In our case, the zero padding function looks like this:

```js
const crypto = require('crypto');

const encrypt = (plain, key, iv = '00000000000000000000000000000000') => {
  const cipher = crypto.createCipheriv('aes-256-cbc', toHexBuffer(key), toHexBuffer(iv));
  cipher.setAutoPadding(false);
  return cipher.update(Buffer.from(plain, 'utf8'), 'utf8', 'hex') + cipher.final('hex');
}

const decrypt = (encrypted, key, iv = '00000000000000000000000000000000') => {
  const decipher = crypto.createDecipheriv('aes-256-cbc', toHexBuffer(key), toHexBuffer(iv));
  decipher.setAutoPadding(false);
  return decipher.update(Buffer.from(encrypted, 'hex'), 'utf8', 'utf8') + decipher.final('utf8');
}

const toHexBuffer = string => Buffer.from(string, 'hex')

const zeropad = (inputData, length = 8) => {
  inputData = new Buffer(inputData, "utf8").toString("hex");
  console.log(`before padding \t${inputData}`)
  const bitLength = inputData.length * length;
  if (bitLength < 256) {
    for (i = bitLength; i < 256; i += length) {
          inputData += 0;
    }
  } else if (bitLength > 256) {
    while ((inputData.length * length) % 256 != 0) {
        inputData += 0;
    }
  }
  console.log(`after padding \t${inputData}`)
  return new Buffer(inputData, "hex").toString("utf8");
}

const key = "1111111111111111111111111111111111111111111111111111111111111111"
const iv = "22222222222222222222222222222222"

console.log(`aes key \t${key}`)
console.log(`init vector \t${iv}`)

let plain = "Hello world"
plain = zeropad(plain, 8)

const encrypted = encrypt(plain, key, iv)
console.log(`Encrypted \t${encrypted}`)

const decrypted = decrypt(encrypted, key, iv);
console.log(`Decrypted \t${decrypted}`)
```

And the result of running it is this:

```shell
before padding 	48656c6c6f20776f726c64
after padding 	48656c6c6f20776f726c640000000000
Encrypted 	3b03f1089ca85516a8ce9adf45552aca
Decrypted 	Hello world
```
