/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/prefer-default-export */
import {gql} from '@apollo/client';

export const Product_Categories_By_List = gql`
  query onGetProductCategoriesByList($input: ProductCategoryByListInput!) {
    getProductCategoriesByList(input: $input) {
      categories {
        id
        name
      }
    }
  }
`;
