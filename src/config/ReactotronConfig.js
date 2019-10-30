import Reactotron, {asyncStorage} from 'reactotron-react-native';
import {AsyncStorage} from '@react-native-community/async-storage';
import {reactotronRedux} from 'reactotron-redux';

export default Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure() // controls connection & communication settings
  .setAsyncStorageHandler(AsyncStorage) // <- here!
  .use(asyncStorage()) // <--- here we go!

  .useReactNative() // add all built-in react native plugins
  .use(reactotronRedux())
  .connect(); // let's connect!

console.tron = Reactotron;
