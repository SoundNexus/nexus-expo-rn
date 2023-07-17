import axios, { AxiosInstance } from 'axios';
import config from '../config';
class PinataServices {
  auth: any;

  constructor() {
  }

  public async uploadImageToIPFS(image: FormData): Promise<any> { 
    console.log("🚀 ~ file: pinata.ts:34 ~ PinataServices ~ uploadImageToIPFS ~ image:", image)
    const options = {
      headers: {
        'Content-Type': `multipart/form-data`,
        'Authorization': `Bearer ${this.auth}`,
      }
    }

    return axios.post(`${config.PINATA_API_URL}pinning/pinFileToIPFS`, image, options);
  }

}

const PinataService = new PinataServices();
export default PinataService