const { HypersignEdvClientEd25519VerificationKey2020 } = require("@hypersign-protocol/hypersign-vault-client");
const { HypersignDID } = require('hs-ssi-sdk')
const { X25519KeyAgreementKey2020 } = require("@digitalbazaar/x25519-key-agreement-key-2020")
const { Ed25519VerificationKey2020 } = require("@digitalbazaar/ed25519-verification-key-2020")
const memonic = "liquid stool fit early point shift dove junior wine load absurd message"
const bip39 = require("bip39")
const keyResolver = async ({ id }) => {
    // Resolve the key from the DID Document or from the blockchain or from any other source
    // sample authentication key after did resolution
    // Caution: This is just a sample snippet (This will cause error). You should resolve the key from the DID Document or from the blockchain or from any other source

    const authenticationKey = {
        '@context': 'https://w3id.org/security/suites/ed25519-2020/v1',
        id: didDocument.id.split('#')[0] + '#' + keys.publicKeyMultibase,
        controller: didDocument.id,
        publicKeyMultibase: keys.publicKeyMultibase,
    }
    const ed25519 = await Ed25519VerificationKey2020.from(authenticationKey);
    return ed25519;

}








const main = async () => {


    const hsDidSdk = new HypersignDID({ namespace: "testnet" })
    const seed = bip39.mnemonicToEntropy('rigid tribe noise city fashion industry amazing outside glue tide meadow draw option private north cheese winter exotic shop address million finish aunt ritual');

    const seedBuffer = Buffer.from(seed, 'hex')

    const keys = await hsDidSdk.generateKeys({
        seed: seedBuffer
    })

    console.log("DID document is being generated .............");
    const didDocument = await hsDidSdk.generate({ publicKeyMultibase: keys.publicKeyMultibase })
    console.log("======================================");
    console.log(JSON.stringify(didDocument, null, 2));
    console.log("======================================");



    const authenticationKey = {
        '@context': 'https://w3id.org/security/suites/ed25519-2020/v1',
        id: didDocument.id + '#' + keys.publicKeyMultibase,
        controller: didDocument.id,
        publicKeyMultibase: keys.publicKeyMultibase,
        privateKeyMultibase: keys.privateKeyMultibase
    }
    const ed25519 = await Ed25519VerificationKey2020.from(authenticationKey);
    const x25519 = await X25519KeyAgreementKey2020.fromEd25519VerificationKey2020({
        keyPair: {
            publicKeyMultibase: keys.publicKeyMultibase,
            privateKeyMultibase: keys.privateKeyMultibase
        }
    });


    const keyAgreementKey = {
        id: didDocument.id + '#' + x25519.publicKeyMultibase,
        type: 'X25519KeyAgreementKey2020',
        publicKeyMultibase: x25519.publicKeyMultibase

    }


    // Initialise vaultClass 
    const vault = new HypersignEdvClientEd25519VerificationKey2020({
        keyResolver,
        url: 'http://localhost:3001',
        ed25519VerificationKey2020: ed25519,
        x25519KeyAgreementKey2020: x25519,

    })


    //  vault configuration 
    const config = {
        url: 'http://localhost:3001',
        keyAgreementKey,
        controller: authenticationKey.id,
        edvId: 'pratap-sample-vault',

    }




    console.log("===================Register EDV===================");

    const res = await vault.registerEdv(config);
    console.log("======================================");


    const data = {
        content: {

            secretData: "random Secret",

            description: {
                textIndex: "sample-text-index",

            },
            anotherIndex: {
                idx: 1
            }

        }
    }

    console.log(JSON.stringify(data, null, 4));

    console.log("=================Store Data (will not store if the unique index is alreday there)=====================");


    const res1 = await vault.insertDoc({
        document: data,
        edvId: 'pratap-sample-vault',
        recipients: [{
            id: didDocument.id + '#' + x25519.publicKeyMultibase,
            type: 'X25519KeyAgreementKey2020',
            publicKeyMultibase: x25519.publicKeyMultibase
        }],
        indexs: [{
            index: 'content.anotherIndex.idx',
            unique: true
        },
        {
            index: 'content.description.textIndex',
            unique: false
        }]


        // hs:doc:bkg97bswcjbgycadxsj_gwvemqbap59uumv0ro3bqja
    })



    console.log(res1);
    console.log("===================fetch document===================");



    const res2 = await vault.fetchDoc({
        edvId: 'pratap-sample-vault',
        documentId: "hs:doc:r0cbml3j60srfbdulwa_csp1_0set4vxmfc1cj7okpy",
    })
    console.log("======================================");

    console.log(res2);
    console.log("======================================");

    x25519.id = didDocument.id + '#' + x25519.publicKeyMultibase
    const decryptdDocument = await vault.decryptObject({
        jwe: res2.document.jwe,
        keyAgreementKey: x25519,
    })
    console.log("=================decrypt=====================");

    console.log(decryptdDocument);
    console.log("======================================");

    const query = await vault.Query({
        edvId: 'pratap-sample-vault',
        equals: [
            {
                'content.anotherIndex.idx': 1
            }]
    })

    console.log("==================Query using index ====================");

    console.log(query);
    console.log("======================================");


}


main()