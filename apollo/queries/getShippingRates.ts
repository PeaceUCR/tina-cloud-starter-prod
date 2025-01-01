import {gql} from '@apollo/client';

export const GET_SHIPPING_AND_TAX_RATES = gql`
    query GET_SHIPPING_AND_TAX_RATES($input: GetShippingAndTaxRatesInput!) {
        getShippingAndTaxRates(input: $input) {
            shippingRate {
                amount
            }
            expediteShippingRate {
                objectId
                amount
            }
            taxRate {
                totalTax
            }
        }
    }
`;
