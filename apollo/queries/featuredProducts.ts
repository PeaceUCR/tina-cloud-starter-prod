/* eslint-disable @typescript-eslint/naming-convention */
import {gql} from '@apollo/client';

export const Featured_Products = gql`
    query GetFeaturedProducts {
        getFeaturedProducts {
            enabledFeatured
            products {
                id
                name
                media {
                    id
                    url
                }
                salePrice
            }
        }
    }
`;
