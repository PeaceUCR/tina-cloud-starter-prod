/* eslint-disable import/prefer-default-export */
import {gql} from '@apollo/client';

export const DeleteReviewMutation = gql`
  mutation onDeleteProductReview($id: Int!) {
    deleteProductReview(id: $id) {
      success
      message
    }
  }
`;
