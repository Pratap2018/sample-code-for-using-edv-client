

# Quick start

```
npm i 

node src/index.js
```


### Output

```
DID document is being generated .............
======================================
{
  "@context": [
    "https://www.w3.org/ns/did/v1",
    "https://w3id.org/security/suites/ed25519-2020/v1"
  ],
  "id": "did:hid:testnet:z6MknBaQjiGC5jHUwMJHH8jva6V7GjdWX9dZoBLGgtoGp2wt",
  "controller": [
    "did:hid:testnet:z6MknBaQjiGC5jHUwMJHH8jva6V7GjdWX9dZoBLGgtoGp2wt"
  ],
  "alsoKnownAs": [
    "did:hid:testnet:z6MknBaQjiGC5jHUwMJHH8jva6V7GjdWX9dZoBLGgtoGp2wt"
  ],
  "verificationMethod": [
    {
      "id": "did:hid:testnet:z6MknBaQjiGC5jHUwMJHH8jva6V7GjdWX9dZoBLGgtoGp2wt#key-1",
      "type": "Ed25519VerificationKey2020",
      "controller": "did:hid:testnet:z6MknBaQjiGC5jHUwMJHH8jva6V7GjdWX9dZoBLGgtoGp2wt",
      "publicKeyMultibase": "z6MknBaQjiGC5jHUwMJHH8jva6V7GjdWX9dZoBLGgtoGp2wt"
    }
  ],
  "authentication": [
    "did:hid:testnet:z6MknBaQjiGC5jHUwMJHH8jva6V7GjdWX9dZoBLGgtoGp2wt#key-1"
  ],
  "assertionMethod": [
    "did:hid:testnet:z6MknBaQjiGC5jHUwMJHH8jva6V7GjdWX9dZoBLGgtoGp2wt#key-1"
  ],
  "keyAgreement": [],
  "capabilityInvocation": [
    "did:hid:testnet:z6MknBaQjiGC5jHUwMJHH8jva6V7GjdWX9dZoBLGgtoGp2wt#key-1"
  ],
  "capabilityDelegation": [
    "did:hid:testnet:z6MknBaQjiGC5jHUwMJHH8jva6V7GjdWX9dZoBLGgtoGp2wt#key-1"
  ],
  "service": []
}
======================================
===================Register EDV===================
======================================
{
    "content": {
        "secretData": "random Secret",
        "description": {
            "textIndex": "sample-text-index"
        },
        "anotherIndex": {
            "idx": 1
        }
    }
}
=================Store Data (will not store if the unique index is alreday there)=====================
{
  statusCode: 500,
  timestamp: '2024-07-12T14:17:21.103Z',
  path: '/api/v1/vault/pratap-sample-vault/document',
  message: [
    'Error',
    'Error: Unique index alreday exists',
    'Internal server error'
  ]
}
===================fetch document===================
======================================
{
  message: 'document fetched',
  document: {
    _id: '66913a360c7b02a7322a2b5d',
    indexed: [ [Object] ],
    jwe: {
      protected: 'eyJlbmMiOiJYQzIwUCJ9',
      recipients: [Array],
      iv: 'KKbJLVu90gCtSUdD22bCbxAaHKmyCK4s',
      ciphertext: 'SFEQ6dtE9o5pzCKGmaIXC-blNYxGmD2-moeGyBbmAJt3EmHzmGF3pjzA3-jt-Wj0yDLfJEDMOxf7XGuyJryD_qvXH____hmJ_BInpJZFogOQZBXh5tLK4F9n8VSaGB_yF4OmriiKNoOA3-iaE4Tt3MjHpA',
      tag: 'yxWjOEn9BH-muyzk2lXlJw'
    },
    encryptedData: {
      version: 'x25519-xsalsa20-poly1305',
      nonce: 'ckYmEVJ0fSZ96/99KZ8hM029AL7N9Fcr',
      ephemPublicKey: 'uN96hM6qBcD8epkEaSif2KdxHuiAl9zLk103cs3iAAE=',
      recipients: [],
      ciphertext: '7b75MR60kkRiSpuQ75k2CSpjVwQR9ojM/ZlDzM5NbBo8esdAiJ/UAPc4AXjCHBXg6QQDZoHjVxGEDnmAMt1FRnOP/j5gkOJesP+EH9/kd+UD8VB1PC54GVvBq4HU1wrhcKdkoih/MLv8LcTJCqXh7ZZoKgJu2jna73R6LUe0Znz6CEk='
    },
    id: 'hs:doc:r0cbml3j60srfbdulwa_csp1_0set4vxmfc1cj7okpy',
    createdAt: '2024-07-12T14:14:14.686Z',
    updatedAt: '2024-07-12T14:14:14.686Z',
    __v: 0,
    sizeInbytes: 1808
  }
}
======================================
=================decrypt=====================
{
  content: {
    secretData: 'random Secret',
    description: { textIndex: 'sample-text-index' },
    anotherIndex: { idx: 1 }
  }
}
======================================
==================Query using index ====================
[
  {
    _id: '66913a360c7b02a7322a2b5d',
    id: 'hs:doc:r0cbml3j60srfbdulwa_csp1_0set4vxmfc1cj7okpy'
  }
]
======================================
```