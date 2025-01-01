import {gql} from '@apollo/client';

export const AddToWaitlistsMutation = gql`
  mutation ADD_TO_WAITLISTS($input: AddToWaitlistsInput!) {
    addToWaitlists(input: $input) {
      message
      success
    }
  }
`;
