import 'react-native-gesture-handler';
import {Navigator} from './src/presentation/navigation/StackNavigator';
import {NavigationContainer} from '@react-navigation/native';

export default function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}
