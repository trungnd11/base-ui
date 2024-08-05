export interface LoginModel {
  username: string
  password: string
  remember?: boolean
};
export interface LoginResponseEim {
  expiresIn: number
  granted: string[]
  refreshToken: string
  token: string
};

export interface LoginProps {
  actionLogin?: (value: Record<string, string>) => void
  title?: string
  titleLogin?: string
  logo?: string
  isLoadingBtn?: boolean
}
