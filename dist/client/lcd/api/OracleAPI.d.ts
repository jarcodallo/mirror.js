import { BaseAPI } from './BaseAPI';
import { ValAddress, Denom, ExchangeRateVote, Coin, Coins, ExchangeRatePrevote, AccAddress, Dec, AggregateExchangeRatePrevote, AggregateExchangeRateVote } from '../../../core';
declare type OracleWhitelist = {
    name: Denom;
    tobin_tax: Dec;
}[];
export interface OracleParams {
    /** Number of blocks that define the period over which new votes must be submitted for the exchange rate of LUNA. */
    vote_period: number;
    /** Ratio of voting power that must be reached for a denomination to be considered "active." */
    vote_threshold: Dec;
    /** The ratio of the band around the weighted median of the voted exchange rates whose voters are eligible for rewards. Votes that reported exchange rates that lie beyond this band are considered misses. */
    reward_band: Dec;
    /** Number of blocks that define the period over which oracle rewards from non-missed Oracle votes accrue. They are disbursed at the end of these periods. */
    reward_distribution_window: number;
    /** List of active denominations that must be voted on.
     * @returns String[] on Columbus-3
     * @returns { name: String, tobin_tax: String }[] on Columbus-4 or later
     */
    whitelist: Denom[] | OracleWhitelist;
    /** Percetange of stake slashed once per slash window. */
    slash_fraction: Dec;
    /** Number of blocks that define the period over which slashing penalties for missing votes are incurred. */
    slash_window: number;
    /** Minimum percentage of valid (non-miss) exchange rate votes per slash window. */
    min_valid_per_window: Dec;
}
export declare namespace OracleParams {
    interface Data {
        vote_period: string;
        vote_threshold: string;
        reward_band: string;
        reward_distribution_window: string;
        whitelist: Denom[] | OracleWhitelist;
        slash_fraction: string;
        slash_window: string;
        min_valid_per_window: string;
    }
}
export declare class OracleAPI extends BaseAPI {
    /**
     * Query the currently casted votes for the exchange rate of LUNA, filterable by validator or denom.
     *
     * At least one of the parameters **must** be provided.
     * @param denom denomination to query votes for
     * @param validator validator operator address to query votes for
     */
    votes(denom?: Denom, validator?: ValAddress): Promise<ExchangeRateVote[]>;
    /**
     * Query the currently casted vprevotes, filterable by validator or denom.
     *
     * At least one of the parameters **must** be provided.
     * @param denom denomination to query prevotes for
     * @param validator validator operator address to query prevotes for
     */
    prevotes(denom?: Denom, validator?: ValAddress): Promise<ExchangeRatePrevote[]>;
    /**
     * Gets the Oracle module's currently registered exchange rate for LUNA in all available denominations.
     */
    exchangeRates(): Promise<Coins>;
    /**
     * Gets the Oracle module's currently registered exchange rate for the specific denomination.
     * @param denom denomination in which to get the exchange rate of LUNA
     */
    exchangeRate(denom: Denom): Promise<Coin | undefined>;
    /**
     * Gets the current list of active denominations.
     */
    activeDenoms(): Promise<Denom[]>;
    /**
     * Gets the registered feeder address associated with the validator. The feeder address is the
     * Terra account that is permitted to sign Oracle vote messages in the validator's name.
     * @param validator validator's operator address
     */
    feederAddress(validator: ValAddress): Promise<AccAddress>;
    /**
     * Gets the number of missed oracle votes for the validator over the current slash window.
     * @param validator validator's operator address
     */
    misses(validator: ValAddress): Promise<number>;
    /**
     * Gets the validator's current submitted aggregate prevote
     * @param validator validator's operator address
     */
    aggregatePrevote(validator: ValAddress): Promise<AggregateExchangeRatePrevote>;
    /**
     * Gets the validator's current submitted aggregate vote
     * @param validator validator's operator address
     */
    aggregateVote(validator: ValAddress): Promise<AggregateExchangeRateVote>;
    /**
     * Gets the current Oracle module's parameters.
     */
    parameters(): Promise<OracleParams>;
}
export {};