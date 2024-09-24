import { Product } from '../../../domain/entities/product';
import { Layout, List } from '@ui-kitten/components';
import { ProductCard } from './ProductCard';
import { useState } from 'react';
import { RefreshControl } from 'react-native-gesture-handler';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  products: Product[];
  fetchNextPage: () => void;
}

export const ProductList = ({products, fetchNextPage}: Props) => {
  const [isRefreshin, setIsRefreshin] = useState(false);

  const queryClient = useQueryClient()

  const onPullToRefresh = async () => {
    setIsRefreshin(true);
    // sleep 2s
    await new Promise(resolve =>
      setTimeout(resolve, 1000),
    );
    queryClient.invalidateQueries({queryKey: ['products', 'infinite']})

    setIsRefreshin(false);
  };

  return (
    <List
      data={products}
      numColumns={2}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({item}) => <ProductCard product={item} />}
      ListFooterComponent={() => <Layout style={{height: 150}} />}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.8}
      refreshControl={<RefreshControl refreshing={isRefreshin} onRefresh={onPullToRefresh}/>}
    />
  );
};
