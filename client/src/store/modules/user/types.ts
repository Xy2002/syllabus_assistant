export type RoleType = '' | '*' | 'admin' | 'user'
export interface UserState {
  token: string
  name?: string
  account?: string
  role: RoleType
}
