import {Button, Input, Layout, Text} from '@ui-kitten/components';
import {Alert, useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {MyIcon} from '../../components/MyIcon';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParams} from '../../navigation/StackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {API_URL} from '@env';
import {useState} from 'react';
import {useAuthStore} from '../../store/auth/useAuthStore';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({route, navigation}: Props) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const {login} = useAuthStore();

  const {height} = useWindowDimensions();

  const onLogin = async () => {
    if (form.email.length === 0 || form.password.length === 0) return;
    setIsLoading(true);

    const wasSuccesful = await login(form.email, form.password);
    setIsLoading(false);
    if (wasSuccesful) return;

    Alert.alert('Error', 'Usuario o contraseña incorrectos');
  };

  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.35}}>
          <Text category="h1">Ingresar</Text>
          <Text category="p2">Por favor, ingrese para continuar</Text>
        </Layout>

        {/* inputs */}

        <Layout style={{marginTop: 20}}>
          <Input
            placeholder="Correo electronico"
            keyboardType="email-address"
            autoCapitalize="none"
            style={{marginBottom: 10}}
            accessoryLeft={<MyIcon name="email-outline" />}
            value={form.email}
            onChangeText={value => setForm({...form, email: value})}
          />
          <Input
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
            style={{marginBottom: 10}}
            accessoryLeft={<MyIcon name="lock-outline" />}
            value={form.password}
            onChangeText={value => setForm({...form, password: value})}
          />
        </Layout>

        {/*  */}
        <Layout style={{height: 10}} />

        <Layout>
          <Button
            onPress={() => onLogin()}
            // appearance='ghost'
            disabled={isLoading}
            accessoryRight={<MyIcon name="arrow-forward-outline" white />}>
            Ingresar
          </Button>

          {/* Informacion para crear cuenta */}
          <Layout style={{height: 50}} />
          <Layout style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text>¿No tienes cuenta?</Text>
            <Text
              status="primary"
              category="s1"
              onPress={() => navigation.navigate('RegisterScreen')}>
              {' '}
              crea una{' '}
            </Text>
          </Layout>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
