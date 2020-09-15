let _navigator:any;

function setNavigator(navigatorRef:any) {
  _navigator = navigatorRef;
  return _navigator;
}
function getNavigator() {
  return _navigator;
}
export {
  getNavigator,
  setNavigator,
};