import {gql} from '@apollo/client';

export const EDIT_WLA_MODAL = gql`
  query isEditWLAModal {
    isEditWLAModal @client
  }
`;
