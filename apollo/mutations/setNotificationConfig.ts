/* eslint-disable import/prefer-default-export */
import {gql} from '@apollo/client';

export const SetNotificationConfigMutation = gql`
  mutation SetNotificationConfig($input: NotificationConfig!) {
    setNotificationConfig(input: $input) {
      success
      message
    }
  }
`;
