import { Platform } from "react-native";

let baseURL = "";

{
  Platform.OS == ""
    ? (baseURL =
        "http://192.168.0.157:8080/api/")
    : (baseURL =
        "http://192.168.0.157:8080/api");
}

export default baseURL;
