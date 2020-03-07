import { TransformDataFn } from "../types";

/**
 * Transforms in a format suitable for visualization as a stacked bar chart
 *
 * raw data is of the format {
 *     "6.5":{
 *         "A":...
 *         "B":...
 *     }
 * }
 *
 * transformed data : {
 *     size: "6.5",
 *     "A": ...
 *     "B":....,
 *     "2A-2E":..,
 *     "3A-3E":..
 * }
 *
 * NOTE that for sizes from 2a-2e we add them all up, same for 3a-3e
 *
 * @param data - raw data from the api
 * @return {sizingSystem, gender, data}
 * data is transformed into relevant format
 *
 */

const transformData: TransformDataFn = ({
  system: sizingSystem,
  gender,
  sizes: rawSizes
}) => {
  // sorts the sizes numerically
  const sizes = Object.keys(rawSizes).sort((a, b) => {
    // note + casts strings into numbers
    if (+a > +b) {
      return -1;
    } else {
      return 1;
    }
  });

  // ENHANCEMENT: Remove typecasts

  const flattenedData = sizes.reduce((acc: any[], size) => {
    const tokens = Object.keys(rawSizes[size]);

    const tokenData = tokens.reduce((acc: any, token) => {
      // if the token is 2A, 2B, 2C,2D or 2E , add them

      if (token.includes("2")) {
        if (acc["2A-2E"]) {
          return {
            // @ts-ignore
            "2A-2E": acc["2A-2E"] + rawSizes[size][token],
            ...acc
          };
        } else {
          return {
            // @ts-ignore
            "2A-2E": rawSizes[size][token],
            ...acc
          };
        }
      }
      // if the token is 3A, 3B, 3C,3D or 3E , add them
      if (token.includes("3")) {
        // @ts-ignore
        if (acc["3A-3E"]) {
          return {
            // @ts-ignore
            "3A-3E": acc["3A-3E"] + rawSizes[size][token],
            ...acc
          };
        } else {
          return {
            // @ts-ignore
            "3A-3E": rawSizes[size][token],
            ...acc
          };
        }
      }

      return {
        // @ts-ignore
        [token]: rawSizes[size][token] as any,
        ...acc
      };
    }, {});

    return [
      {
        size,
        ...tokenData
      },
      ...acc
    ];
  }, []);

  return {
    sizingSystem,
    gender,
    data: flattenedData
  };
};

export default transformData;
