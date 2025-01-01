/* eslint-disable @typescript-eslint/naming-convention */
import {gql} from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const Get_Address = gql`
  query GetAddress {
    getAddress {
      id
      receiverName
      addressLine1
      city
      state
      country
      pincode
      type
      isPrimary
      phoneNumber
    }
  }
`;
