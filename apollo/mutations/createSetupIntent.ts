/* eslint-disable import/prefer-default-export */
import {gql} from '@apollo/client';

export const CREATE_SETUP_INTENT = gql`
  mutation CreateSetupIntent {
    createSetupIntent {
      clientSecret
    }
  }
`;
