import {gql} from '@apollo/client';

export const GET_ORDER_ITEMS_LIST = gql`
  query GET_ORDER_ITEMS_LIST($input:GetOrderItemsInput!){
      getOrderItems(input:$input){
        id
        orderId
        quantity
        price
        status
        shipmentState
        poroductName
        poroductImageUrl
        deliveryExpectedOn
      }
  }
`;
