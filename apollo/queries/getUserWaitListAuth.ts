/* eslint-disable @typescript-eslint/naming-convention */
import {gql} from '@apollo/client';

export const Wait_List_Auth = gql`
  query UserWaitlistAuthorized($input: GetWaitlistAuthInput!) {
    getUserWaitlistAuthorized(input: $input) {
      id
      name
      variantId
      savedQuantity
      imageURL
      cost
      isFavorite
      categoryId
      availableFrom
    }
  }
`;
