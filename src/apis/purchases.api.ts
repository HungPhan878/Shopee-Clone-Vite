import { Purchases, PurchasesListStatus } from 'src/types/purchases.type'
import { SuccessResponsiveApi } from 'src/types/util.type'
import http from 'src/utils/http'

const URL = 'purchases'

const purchasesApi = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post<SuccessResponsiveApi<Purchases>>(`${URL}/add-to-cart`, body)
  },

  getPurchasesList(params: { status: PurchasesListStatus }) {
    return http.get<SuccessResponsiveApi<Purchases[]>>(URL, { params })
  }
}

export default purchasesApi
