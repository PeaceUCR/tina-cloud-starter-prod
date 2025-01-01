import {ENV} from "./env";

export * from './env';

const stripeAccountId = {
    LOCAL: 'acct_1K6prNIeH85ciOHg',
    DEV: 'acct_1K6prNIeH85ciOHg',
    QA: 'acct_1K6prNIeH85ciOHg',
    STAGING: 'acct_1OcIqgAOQzcRh1Ma',
};
export const STRIPE_ACCOUNT_ID = stripeAccountId[ENV];
export const wishListLimitCount = 20;
export const waitListAuthLimitCount = 20;
export const allProductsLimitCount = 20;
export const reviewsLimitCount = 10;
export const waitListLimitCount = 20;
export const isInTestMode = true;
export const redirectURL = 'trybuysocial://';
export const sezzleSuccessURI = `${redirectURL}sezzle?success=true`;
export const sezzleFailureURI = `${redirectURL}sezzle?success=false`;

export const SHOW_IMAGE_LOADER = 'SHOW_IMAGE_LOADER';
export enum OrderStatus {
    CREATED = 'created',
    PENDING = 'pending',
    AWAITING_PAYMENT = 'awaiting_payment',
    AWAITING_FULFILLMENT = 'awaiting_fulfillment',
    AWAITING_PROCESSING = 'awaiting_processing',
    AWAITING_SHIPMENT = 'awaiting_shipment',
    AWITING_PICKUP = 'awiting_pickup',
    PARTIALLY_SHIPPED = 'partially_shipped',
    COMPLETED = 'completed',
    SHIPPED = 'shipped',
    CANCELLED = 'cancelled',
    DECLINED = 'declined',
    REFUNDED = 'refunded',
    DISPUTED = 'disputed',
    MANUAL_VERIFICATION_REQUIRED = 'manual_verification_required',
    PARTIALLY_REFUND = 'partially_refund',
}
