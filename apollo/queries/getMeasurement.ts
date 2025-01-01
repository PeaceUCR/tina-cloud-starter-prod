/* eslint-disable @typescript-eslint/naming-convention */
import {gql} from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const Get_Measurements = gql`
  query GetMeasurements($input: GetMeasurementsInput!) {
    getMeasurements(input: $input) {
      name
      value
      imageUrl
    }
  }
`;
