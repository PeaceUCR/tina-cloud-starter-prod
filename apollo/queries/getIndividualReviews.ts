/* eslint-disable @typescript-eslint/naming-convention */
import {gql} from '@apollo/client';

export const Get_Individual_Reviews = gql`
    query GetReviewsByFilter($input: GetReviewsByFilterInput!) {
        getReviewsByFilter(input: $input) {
            id
            userId
            userName
            userImage {
                id
                url
            }
            productId
            variantId
            dateOfRating
            rating
            reviewComment
            medias {
                id
                url
            }
        }
    }
`;
