/* eslint-disable @typescript-eslint/naming-convention */
import {gql} from '@apollo/client';

export const Get_Rating = gql`
    query GetRating($input: ProductData!) {
        getRating(input: $input) {
            rating
            ratingCount
            medias {
                id
                url
                reviewId
            }
        }
    }
`;
