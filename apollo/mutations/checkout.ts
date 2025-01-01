/* eslint-disable import/prefer-default-export */
import {gql} from '@apollo/client';

export const CheckoutMutation = gql`
    mutation CreateOrder($input: CreateOrderInput!) {
        createOrder(input: $input) {
            success
            message
        }
    }
`;
