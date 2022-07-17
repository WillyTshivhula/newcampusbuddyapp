import { Platform } from 'react-native'

let baseURL = '';

{Platform.OS == "android"
  ? (baseURL =
      "http://http://campusapi-env.eba-pdyrxrjw.us-east-1.elasticbeanstalk.com/api/")
  : (baseURL =
      "http://http://campusapi-env.eba-pdyrxrjw.us-east-1.elasticbeanstalk.com/api");
}

export default baseURL;


