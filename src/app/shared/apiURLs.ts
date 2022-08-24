import { environment } from "src/environments/environment";

// tslint:disable-next-line: no-namespace
export namespace ApiUrls {
  export const login = `${environment.baseAccountsApiUrl}api/v1/accounts/login`;
  export const logout = `${environment.baseAccountsApiUrl}api/v1/accounts/logout`;
}
