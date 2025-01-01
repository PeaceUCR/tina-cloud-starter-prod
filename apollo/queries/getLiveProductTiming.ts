import {gql} from '@apollo/client';

export const GET_LIVE_PRODUCT_TIMING = gql`
  query GET_LIVE_PRODUCT_TIMING($id: String!){
    getLiveProductTiming(showId:$id){
      times
      timeDetails
      products{
        id
        imageUrl
        name
        variants
        salePrice
        productReferenceId
      }
    }
  }
`;