import { APIRequester } from './APIRequester';
import { AuthAPI, BankAPI, DistributionAPI, GovAPI, MarketAPI, MsgAuthAPI, OracleAPI, SlashingAPI, StakingAPI, SupplyAPI, TendermintAPI, TreasuryAPI, TxAPI, WasmAPI } from './api';
import { Wallet } from './Wallet';
import { Numeric, Coins } from '../../core';
import { Key } from '../../key';
export interface LCDClientConfig {
    /**
     * The base URL to which LCD requests will be made.
     */
    URL: string;
    /**
     * Chain ID of the blockchain to connect to.
     */
    chainID: string;
    /**
     * Coins representing the default gas prices to use for fee estimation.
     */
    gasPrices?: Coins.Input;
    /**
     * Number presenting the default gas adjustment value to use for fee estimation.
     */
    gasAdjustment?: Numeric.Input;
}
/**
 * An object repesenting a connection to a terrad node running the Lite Client Daemon (LCD)
 * server, a REST server providing access to a node.
 *
 * ### Example
 *
 * ```ts
 * import { LCDClient, Coin } from 'terra.js';
 *
 * const terra = new LCDClient({
 *    URL: "https://lcd.terra.dev",
 *    chainID: "columbus-3"
 * });
 *
 * terra.market.swapRate(new Coin('uluna', 10000), 'ukrw').then(c => console.log(c.toString()));
 * ```
 */
export declare class LCDClient {
    config: LCDClientConfig;
    apiRequester: APIRequester;
    auth: AuthAPI;
    bank: BankAPI;
    distribution: DistributionAPI;
    gov: GovAPI;
    market: MarketAPI;
    msgauth: MsgAuthAPI;
    oracle: OracleAPI;
    slashing: SlashingAPI;
    staking: StakingAPI;
    supply: SupplyAPI;
    tendermint: TendermintAPI;
    treasury: TreasuryAPI;
    wasm: WasmAPI;
    tx: TxAPI;
    /**
     * Creates a new LCD client with the specified configuration.
     *
     * @param config LCD configuration
     */
    constructor(config: LCDClientConfig);
    /** Creates a new wallet with the Key. */
    wallet(key: Key): Wallet;
}