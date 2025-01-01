/* eslint-disable import/prefer-default-export */
import {gql} from '@apollo/client';

export const GET_REFETCH_REVIEW_RATING = gql`
  query isRefetchReviewRating {
    isRefetchReviewRating @client
  }
`;
