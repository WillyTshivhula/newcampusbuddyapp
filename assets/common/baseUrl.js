import { Platform } from "react-native";

let baseURL = "";

{
  Platform.OS == ""
    ? (baseURL =
        "http://campusapi-env.eba-pdyrxrjw.us-east-1.elasticbeanstalk.com/api/")
    : (baseURL =
        "http://campusapi-env.eba-pdyrxrjw.us-east-1.elasticbeanstalk.com/api");
}

export default baseURL;
