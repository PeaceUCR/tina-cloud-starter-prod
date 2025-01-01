import {gql} from '@apollo/client';

export const GET_WAITLIST = gql`
  query getUserWaitlist($input: GetWaitlistInput) {
    getUserWaitlist(input: $input) {
      id
      name
      variantId
      quantity
      savedQuantity
      imageURL
      cost
      isFavorite
      categoryId
      availableFrom
    }
  }
`;
