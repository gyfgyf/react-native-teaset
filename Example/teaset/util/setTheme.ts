import { DeviceEventEmitter } from 'react-native';
function setTheme(theme:string) {
  DeviceEventEmitter.emit('react-native-teaset/changeTheme', theme);
}
export default setTheme;