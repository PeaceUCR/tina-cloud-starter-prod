/* eslint-disable @typescript-eslint/naming-convention */
import {gql} from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const Get_Notification_Config = gql`
  query GET_NOTIFICATION_CONFIG {
    getNotificationConfig {
      boutiqueLive
      newProduct
      orderStatusChange
      waitlistProductAvailable
      waitlistAuthorizedProductPurchased
      returnStatusChange
    }
  }
`;
