import {gql} from '@apollo/client';

export const GET_IS_REVIEW_MODAL = gql`
    query isReviewModal {
        isReviewModal @client
    }
`;
