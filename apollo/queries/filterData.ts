/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/prefer-default-export */
import {gql} from '@apollo/client';

export const Filter_Data = gql`
  query onGetFilterData {
    getFilterData {
      sort {
        type
        values {
          id
          name
        }
      }
      price {
        min
        max
      }
      variantTypes {
        type
        values {
          id
          name
        }
      }
    }
  }
`;
