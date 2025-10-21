import ColorPicker from './ColorPicker'

type product = {
  [x: string]: string
  productId: string
  category: string
  productImages: Array<ColorPicker>
  name: string
  discount: number
  discountAmount: number
  measurements: string
  description: string
  price: number
  stockQuantity: number
  packaging: string
  weight: string
  height: string
  widht: string
  information: string
  createdAt: string
}

export default product
