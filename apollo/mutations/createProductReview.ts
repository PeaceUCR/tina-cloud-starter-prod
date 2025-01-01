/* eslint-disable import/prefer-default-export */
import {gql} from '@apollo/client';

export const CreateProductReview = gql`
  mutation onCreateProductReview($input: CreateProductReviewInput!) {
    createProductReview(input: $input) {
      success
      message
      id
    }
  }
`;
