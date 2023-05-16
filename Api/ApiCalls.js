import axios from 'axios';
import Config from './Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
const API_ROOT = Config.baseURL;
const googleKey = Config.googleMapKey;

export const configureAxiosHeaders = async () => {
  axios.defaults.headers['Expires'] = '0';
  axios.defaults.headers['Pragma'] = 'no-cache';
  axios.defaults.headers['Cache-Control'] = 'no-cache';
  axios.defaults.headers['Content-Type'] = 'multipart/form-data';
  axios.defaults.headers['Accept'] = 'application/json';
  const userData = await AsyncStorage.getItem('AuthUser');
  const parsedData = JSON.parse(userData);
  console.log('Async User Data', JSON.stringify(parsedData, null, 2));
  axios.defaults.headers['Authorization'] = 'Bearer '.concat(
    parsedData?.accessToken || '',
  );
};

const requests = {
  del: url => axios.delete(`${API_ROOT}${url}`),
  get: url => axios.get(`${API_ROOT}${url}`),
  put: (url, body) => axios.put(`${API_ROOT}${url}`, body),
  post: (url, body) => axios.post(`${API_ROOT}${url}`, body),
  googleLocation: PLACE_ID =>
    axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?input=bar&placeid=${PLACE_ID}&key=${googleKey}`,
    ),
  FbGraphApi: token =>
    axios.get(
      `https://graph.facebook.com/me?fields=email,name,friends,picture.type(large)&access_token=${token}`,
    ),
};
export const Auth = {
  registerAgency: data => requests.post('auth/register', data),
  editAgencyData: data => requests.post('update-profile', data),
  login: data => requests.post('auth/login', data),
  forgot_Password: data => requests.post('auth/forget-password', data),
  confirm_OTP: data => requests.post('auth/otp-confirm', data),
  reset_Password: data => requests.post('auth/reset-password', data),
};
export const AppFlow = {
  dashboard: () => requests.get('dashboard'),
  getAllClassifieds: () => requests.get('classified'),
  allInventories: () => requests.get('inventory-all'),
  InventoryDetails: id => requests.get(`inventory/${id}`),
  GetClassiffiedDetails: id => requests.get(`classified/${id}`),
  getAllAgencies: () => requests.get('agency'),
  getAgencyDetail: id => requests.get(`agency/${id}`),
  agencyProperties: id => requests.get(`agency/inventory/${id}`),
  createEnventory: data => requests.post('inventory/store', data),
  createClassiffied: data => requests.post('classified/store', data),
  classifiedFilter: data => requests.post('classified/filter', data),
  inventoryFilter: data => requests.post('inventory/filter', data),
  forgot: data => requests.post('auth/forget-password', data),
  getCity: () => requests.get('city'),
  getSociety: (id) => requests.get(`society/${id}`),
  getNewsDetails: id => requests.get(`news/${id}`),
  getAllFeatured: () => requests.get('featured'),
  getSingleFeatured: id => requests.get(`featured/${id}`),
  getPaymentPlan: id => requests.get(`payment-plan/${id}`),
  addFavourite: id => requests.get(`inventory/add-favourite/${id}`),
  getFavourites: () => requests.get(`inventory/get-favourite/list`),
};

export const GetCities = {
  cities: data =>
    axios({
      method: 'post',
      url: 'https://countriesnow.space/api/v0.1/countries/cities',
      headers: {},
      data: {
        country: data,
      },
    }),
};

export const FCMNotification = {
  not: data =>
    axios({
      method: 'post',
      url: 'https://fcm.googleapis.com/fcm/send',
      headers: {
        Authorization:
          'key=AAAAtBeKKck:APA91bGl6DnMOG4ynoYMGYDX3s-a7UHVTE4f_IwylJALynRx13Sidtg3UlY8JrpDlUMJ79jT3utGDUOX6VxBxmcCJKe4TdRBzFlsHgy5Nqk41kaKtEQ4pPbYCA3_fQedCVOcp8CDcTKG',
      },
      data,
    }),
};
