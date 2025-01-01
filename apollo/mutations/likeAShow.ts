/* eslint-disable import/prefer-default-export */
import {gql} from '@apollo/client';

export const LIKE_A_SHOW = gql`
  mutation likeShow($showId: String!) {
    likeShow(showId: $showId) {
      success
      message
    }
  }
`;
