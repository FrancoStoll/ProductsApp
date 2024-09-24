import {
  Button,
  ButtonGroup,
  Input,
  Layout,
  Text,
  useTheme,
} from '@ui-kitten/components';
import {MainLayout} from '../../layouts/MainLayout';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {RootStackParams} from '../../navigation/StackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {getProductById} from '../../../actions/products/get-product-by-id';
import {useRef} from 'react';
import {Image, ScrollView} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {FadeInImage} from '../../components/ui/FadeInImage';
import {Gender, Product, Size} from '../../../domain/entities/product';
import {MyIcon} from '../../components/MyIcon';
import {Formik} from 'formik';
import {updateCreateProduct} from '../../../actions/products/update-create-product';
import {CameraAdapter} from '../../../config/adapters/camera.adapter';

const sizes: Size[] = [Size.Xs, Size.S, Size.M, Size.L, Size.Xl, Size.Xxl];
const genders: Gender[] = [Gender.Kid, Gender.Men, Gender.Women, Gender.Unisex];

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> {}

export const ProductScreen = ({navigation, route}: Props) => {
  // useQuery
  const productIdRef = useRef(route.params.productId);
  const theme = useTheme();
  const queryClient = useQueryClient();
  const {data: product, isLoading} = useQuery({
    queryKey: ['product', productIdRef.current],
    queryFn: () => getProductById(productIdRef.current),
  });

  // useMutation

  const mutation = useMutation({
    mutationFn: (data: Product) =>
      updateCreateProduct({...data, id: productIdRef.current}),
    onSuccess: (data: Product) => {
      productIdRef.current = data.id; // para la creación

      queryClient.invalidateQueries({queryKey: ['products', 'infinite']});
      queryClient.invalidateQueries({
        queryKey: ['product', data.id],
      });

      // queryClient.setQueryData(['product', data.id], data) para actualizar solo ese
    },
    onError: () => {},
  });

  if (!product) {
    return <MainLayout title="Cargando..." />;
  }

  return (
    <Formik
      initialValues={product}
      onSubmit={values => mutation.mutate(values)}>
      {({handleChange, handleSubmit, values, errors, setFieldValue}) => (
        <MainLayout
          rightAction={async () => {
            const photos = await CameraAdapter.getPicturesFromLibrary();
            setFieldValue('images', [...values.images, ...photos])
          }}
          rightActionIcon="image-outline"
          title={values.title}
          subTitle={`Precio:${values.price}`}>
          <ScrollView style={{flex: 1}}>
            <Layout style={{marginVertical: 10}}>
              {values.images.length === 0 ? (
                <Image
                  style={{
                    width: 300,
                    height: 300,
                    marginHorizontal: 7,
                    alignSelf: 'center',
                  }}
                  source={require('../../../assets/no-product-image.png')}
                />
              ) : (
                <FlatList
                  data={values.images}
                  horizontal
                  keyExtractor={item => item}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item}) => (
                    <FadeInImage
                      uri={item}
                      style={{width: 300, height: 300, marginHorizontal: 7}}
                    />
                  )}
                />
              )}

              {/* form */}
              <Layout style={{marginHorizontal: 10}}>
                <Input
                  label="Titulo"
                  value={values.title}
                  style={{marginVertical: 5}}
                  onChangeText={handleChange('title')}
                />
                <Input
                  label="Slug"
                  value={values.slug}
                  style={{marginVertical: 5}}
                  onChangeText={handleChange('slug')}
                />
                <Input
                  label="Descripcón"
                  multiline
                  numberOfLines={7}
                  value={values.description}
                  onChangeText={handleChange('description')}
                  style={{marginVertical: 5}}
                />
              </Layout>
              {/* price stock */}
              <Layout
                style={{
                  marginVertical: 5,
                  marginHorizontal: 15,
                  flexDirection: 'row',
                  gap: 10,
                }}>
                <Input
                  label="Precio"
                  value={values.price.toString()}
                  onChangeText={handleChange('price')}
                  style={{flex: 1}}
                  keyboardType="number-pad"
                />
                <Input
                  label="Inventario"
                  value={values.stock.toString()}
                  onChangeText={handleChange('stock')}
                  style={{flex: 1}}
                  keyboardType="number-pad"
                />
              </Layout>
              {/* button group */}
              <ButtonGroup
                // size='small'
                appearance="outline"
                style={{marginTop: 20, marginHorizontal: 15}}>
                {sizes.map(size => (
                  <Button
                    onPress={() =>
                      setFieldValue(
                        'sizes',
                        values.sizes.includes(size)
                          ? values.sizes.filter(s => s !== size)
                          : [...values.sizes, size],
                      )
                    }
                    key={size}
                    style={{
                      flex: 1,
                      backgroundColor: values.sizes.includes(size)
                        ? theme['color-primary-200']
                        : undefined,
                    }}>
                    {size}
                  </Button>
                ))}
              </ButtonGroup>
              <ButtonGroup
                // size='small'
                appearance="outline"
                style={{marginTop: 20, marginHorizontal: 15}}>
                {genders.map(gender => (
                  <Button
                    onPress={() => setFieldValue('gender', gender)}
                    key={gender}
                    style={{
                      flex: 1,
                      backgroundColor: values.gender.startsWith(gender)
                        ? theme['color-primary-200']
                        : undefined,
                    }}>
                    {gender}
                  </Button>
                ))}
              </ButtonGroup>
            </Layout>
            <Button
              disabled={mutation.isPending}
              onPress={() => handleSubmit()}
              style={{margin: 15}}
              accessoryLeft={<MyIcon name="save-outline" white />}>
              Guardar
            </Button>

            <Layout style={{height: 200}} />
          </ScrollView>
        </MainLayout>
      )}
    </Formik>
  );
};
