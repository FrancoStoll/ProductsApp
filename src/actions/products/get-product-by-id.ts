import { tesloApi } from "../../config/api/tesloApi"
import { Gender, Product } from "../../domain/entities/product"
import { TesloProduct } from "../../infrastructure/interfaces/teslo-product.response"
import { ProductMapper } from "../../infrastructure/mappers/product.mapper"



const emptyProduct: Product = {
    id: '',
    title: '',
    description: '',
    price: 0,
    images: [],
    slug: '',
    gender: Gender.Unisex,
    sizes: [],
    stock: 0,
    tags: [],
}

export const getProductById = async (productId: string): Promise<Product> => {


    if (productId === 'new') {
        return emptyProduct
    }

    try {
        const { data } = await tesloApi<TesloProduct>(`/products/${productId}`)
        const product = ProductMapper.tesloProductToEntity(data)

        return product

    } catch (error) {
        throw new Error(`Error getting product by id: ${productId}`)
    }

}