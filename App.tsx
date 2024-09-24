import 'react-native-gesture-handler';
import {Navigator} from './src/presentation/navigation/StackNavigator';
import * as eva from '@eva-design/eva';
import {NavigationContainer} from '@react-navigation/native';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {useColorScheme} from 'react-native';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {AuthProvider} from './src/presentation/providers/AuthProvider';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App(): React.JSX.Element {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? eva.dark : eva.light;
  const backgroundColor =
    colorScheme === 'dark'
      ? theme['color-basic-800']
      : theme['color-basic-100'];
  return (
    <QueryClientProvider client={queryClient}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <NavigationContainer
          theme={{
            dark: colorScheme === 'dark',
            colors: {
              primary: theme['color-primary-500'],
              background: backgroundColor,
              card: theme['color-basic-100'],
              text: theme['text-basic-color'],
              border: theme['color-basic-800'],
              notification: theme['color-primary-500'],
            },
          }}>
          <AuthProvider>
            <Navigator />
          </AuthProvider>
        </NavigationContainer>
      </ApplicationProvider>
    </QueryClientProvider>
  );
}
