import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/home/HomeScreen';
import {LoginScreen} from '../screens/auth/LoginScreen';
import {RegisterScreen} from '../screens/auth/RegisterScreen';
import {LoadingScreen} from '../screens/loading/LoadingScreen';
import {ProductScreen} from '../screens/product/ProductScreen';

export type RootStackParams = {
  HomeScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ProductScreen: undefined;
  LoadingScreen: {productId: string};
};

const Stack = createStackNavigator<RootStackParams>();

export function Navigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
    </Stack.Navigator>
  );
}
