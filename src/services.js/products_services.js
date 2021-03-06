import axios from 'axios';
import { GET_ALL_PRODUCTS } from './endpoints';
async function GetProducts(page, limit) {
  try {
    var { data } = await axios.get(GET_ALL_PRODUCTS + `?p=${page}&l=${limit}`);
    // var { data } = await axios.get(API_URL);
    return data;
  } catch (error) {
    console.log(error);
    return {
      success: 'false',
    };
  }
  //return data;
}
export { GetProducts };
