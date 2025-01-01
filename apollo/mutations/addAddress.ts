/* eslint-disable import/prefer-default-export */
import {gql} from '@apollo/client';

export const AddAddressMutation = gql`
  mutation onAddAddress($input: AddressInput!) {
    addAddress(input: $input) {
      success
      message
      newAddressId
      addresses {
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
  }
`;
