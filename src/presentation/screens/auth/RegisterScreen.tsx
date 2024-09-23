import {Button, Input, Layout, Text} from '@ui-kitten/components';
import {useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {MyIcon} from '../../components/MyIcon';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParams} from '../../navigation/StackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {useState} from 'react';
import {useAuthStore} from '../../store/auth/useAuthStore';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export const RegisterScreen = ({route, navigation}: Props) => {
  const {height} = useWindowDimensions();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const {register} = useAuthStore();

  function onRegister() {
    register(form.fullName, form.email, form.password);
  }

  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.3}}>
          <Text category="h1">Crear cuenta</Text>
          <Text category="p2">Por favor, crea una cuenta para continuar</Text>
        </Layout>

        {/* inputs */}

        <Layout style={{marginTop: 20}}>
          <Input
            placeholder="Nombre completo"
            style={{marginBottom: 10}}
            accessoryLeft={<MyIcon name="person-outline" />}
            value={form.fullName}
            onChangeText={value => setForm({...form, fullName: value})}
          />
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
            onPress={onRegister}
            // appearance='ghost'
            accessoryRight={<MyIcon name="arrow-forward-outline" white />}>
            Crear
          </Button>

          {/* Informacion para crear cuenta */}
          <Layout style={{height: 50}} />
          <Layout style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text>¿Yá tienes una cuenta?</Text>
            <Text
              status="primary"
              category="s1"
              onPress={() => navigation.goBack()}>
              {' '}
              ingresa{' '}
            </Text>
          </Layout>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
