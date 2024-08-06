import { accountServices } from '../_services'

export function handleResponse(response) {
  return response.text().then(text => {
		const data = text && JSON.parse(text);
		if (!response.ok) {
			if([401, 403].includes(response.status)) {
				// auto logout if 401 Unauthorized or 403 Forbidden response returned from api
				accountServices.logout();
			}
			const error = (data && data.message) || response.statusText;
			return Promise.reject(error);
		}
		return data;
  });
}