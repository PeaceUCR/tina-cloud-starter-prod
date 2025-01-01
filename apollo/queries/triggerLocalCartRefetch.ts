/* eslint-disable import/prefer-default-export */
import {gql} from '@apollo/client';

export const TRIGGER_LOCAL_CART_REFETCH = gql`
  query TriggerRefetchLocalCart {
    triggerRefetchLocalCart @client
  }
`;
