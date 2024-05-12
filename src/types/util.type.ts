export interface ErrorResponsiveApi<Data> {
  message: string
  data?: Data
}

export interface SuccessResponsiveApi<Data> {
  message: string
  data: Data
}
