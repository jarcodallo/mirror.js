import { CreateTxOptions, LCDClientConfig } from '../client';
declare type SendDataType = 'connect' | 'post' | 'sign';
interface SendData {
    id: number | string;
    type: SendDataType;
    [key: string]: any;
}
interface Option extends CreateTxOptions {
    lcdClientConfig?: LCDClientConfig;
}
declare global {
    interface Window {
        Terra: {
            isAvailable: boolean;
        };
    }
}
/**
 * Extension class is for communicating between page and extension
 */
export declare class Extension {
    static instance: Extension;
    private inpageStream;
    /**
     * Using singleton pattern, hence every instanciation will return same value
     */
    constructor();
    private generateId;
    /**
     * Indicates the Station Extension is installed and availble (requires extension v1.1 or later)
     */
    get isAvailable(): boolean;
    /**
     * low level function for sending message to extension.
     * Do not use this function unless you know what you are doing.
     */
    send(data: SendData): void;
    /**
     * Listen to events from the Extension.
     * You will receive an event after calling connect, sign, or post.
     * payload structures are described on each function in @return section.
     *
     * @param name name of event
     * @param callback will be called when `name` event emits
     */
    on(name: string, callback: (payload: any) => void): void;
    /**
     * Request to Station Extension for connecting a wallet
     *
     * @return {string}     name      'onConnect'
     * @return {AccAddress} payload   Terra account address
     */
    connect(): number;
    /**
     * Request to Station Extension for signing tx
     *
     * @param msgs transaction messages to be signed
     * @param account_number account number (optional)
     * @param sequence sequence (optional)
     *
     * @return {string}  name               'onSign'
     * @return {object}  payload
     * @return {number}  payload.id         identifier
     * @return {string}  payload.origin     origin address
     * @return {Msg[]}   payload.msgs       requested msgs
     * @return {boolean} payload.success
     * @return {string}  payload.result.public_key Base64 encoded public key
     * @return {string}  payload.result.signature  Base64 encoded signature
     * @return {number}  payload.result.recid      Recovery id
     * @return {StdSignMsg.Data} payload.result.stdSignMsgData
     *
     * @example of broadcasting
     *
     * const { signature, public_key, recid, stdSignMsg } = payload.result;
     *
     * const sig = StdSignature.fromData({
     *   signature,
     *   pub_key: {
     *    type: 'tendermint/PubKeySecp256k1',
     *    value: public_key,
     *  },
     * });
     *
     * const stdSignMsg = StdSignMsg.fromData(payload.result.stdSignMsgData);
     * terra.tx.broadcast(new StdTx(stdSignMsg.msgs, stdSignMsg.fee, [sig], stdSignMsg.memo));
     */
    sign(options: Option): number;
    /**
     * Request to Station Extension for sign and post to LCD server
     *
     * @param msgs transaction messages to be signed
     * @param lcdClientConfig LCDClientConfig (optional)
     *
     * @return {string}  name                   'onPost'
     * @return {object}  payload
     * @return {number}  payload.id             identifier
     * @return {string}  payload.origin         origin address
     * @return {Msg[]}   payload.msgs           requested msgs
     * @return {LCDClientConfig} payload.lcdClientConfig
     *                                          requested lcdClientConfig
     * @return {boolean} payload.success
     * @return {number|undefined} payload.result.code
     *                                          error code. undefined with successful tx
     * @return {string}  payload.result.raw_log raw log
     * @return {string}  payload.result.txhash  transaction hash
     */
    post(options: Option): number;
}
export {};