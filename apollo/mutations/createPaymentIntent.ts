import {gql} from '@apollo/client';

export const CREATE_PAYMENT_INTENT = gql`
    mutation CREATE_ORDER_PAYMENT_INTENT_STRIPE($input: CreateOrderPaymentIntentInput!) {
        createOrderPaymentIntent(input: $input) {
            sezzleSession
            stripeSession {
                clientSecret
                paymentIntentCode
            }
        }
    }
`;
