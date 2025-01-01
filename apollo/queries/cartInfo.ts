/* eslint-disable @typescript-eslint/naming-convention */
import {gql} from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const Cart_Info = gql`
    query GetCartInfo {
        getUserCartInfo {
            subTotal
            taxCost
            shippingCost
            totalCost
            items {
                productId
                productVariantId
                quantity
            }
        }
    }
`;
