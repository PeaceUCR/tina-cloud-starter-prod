/* eslint-disable @typescript-eslint/naming-convention */
import {gql} from '@apollo/client';

export const Get_Reviews = gql`
    query GetReviews($input: ReviewInput!) {
        getReviews(input: $input) {
            id
            userId
            userName
            userImage {
                id
                url
            }
            productId
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
