import { DecryptCommand, KMSClient, DecryptRequest, CancelKeyDeletionCommand, ListKeysCommand } from '@aws-sdk/client-kms'
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import fs from 'fs';
import path from 'path';
import { TextDecoder } from 'util';

export class AwsKmsService {

    client = new KMSClient({
        region: 'region',
        credentials: { accessKeyId: 'id', secretAccessKey: 'key' }
    });

    getKeys(): Observable<any[]> {
        return from(this.client.send(new ListKeysCommand({}))).pipe(
            map(data => {
                let arry: any[] = [];
                data.Keys.forEach((item) => {
                    arry.push(item);
                });
                return arry;
            })
        );
    }

    decrypt() {
        const txt = fs.readFileSync(path.resolve(__dirname, '../../assets/urfile'));
        const params = {
            CiphertextBlob: txt,
            KeyId: 'key',
            EncryptionAlgorithm: 'SYMMETRIC_DEFAULT'
        };
        return from(this.client.send(new DecryptCommand(params))).pipe(
            map(data => {
                const decoded = new TextDecoder('utf-8').decode(data.Plaintext);
                return decoded;
            })
        );
    }
}
