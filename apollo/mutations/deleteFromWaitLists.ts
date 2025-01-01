import {gql} from '@apollo/client';

export const DeleteFromWaitlists = gql`
  mutation DELETE_FROM_WAITLISTS($input: DeleteFromWaitlistsInput!) {
    deleteFromWaitlists(input: $input) {
      id
      success
      message
    }
  }
`;
