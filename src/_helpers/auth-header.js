import { accountServices } from '../_services'

export function authHeader(url) {
  // return auth header with jwt if user is logged in and request is to the api url
  const account = accountServices.accountValue;
  const isLoggedIn = account && account.token;
  const isApiUrl = url.startsWith(`${process.env.REACT_APP_API_URL}/api`);
  if(isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${account.token}` };
  } else {
    return {};
  }
}