import {gql} from '@apollo/client';

export const GET_CURRENT_LIVE_PRODUCT = gql`
    query GET_CURRENT_LIVE_PRODUCT {
        getCurrentLiveProduct {
            id
            name
            salePrice
            imageUrl
            productReferenceId
            variants
        }
    }
`;
