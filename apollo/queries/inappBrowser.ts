/* eslint-disable import/prefer-default-export */
import {gql} from '@apollo/client';

export const AUTH_BROSWER_RESULT_TYPE = gql`
  query getAuthBrowserResultType {
    getAuthBrowserResultType @client
  }
`;
