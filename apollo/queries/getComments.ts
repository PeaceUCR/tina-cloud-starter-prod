import {gql} from '@apollo/client';

export const GET_COMMENTS = gql`
  query getComments($input: GetCommentsInput!) {
    getComments(input: $input) {
      attributes {
        BSCommentId 
      }
      content
      sendTime
      id
      sender {
        userId
        attributes {
          storeId
          showId
          userImage
          userName
        }
      }
    }
  }
`;
