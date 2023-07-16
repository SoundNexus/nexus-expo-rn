import axios, { AxiosInstance } from 'axios';
import config from '../config';
class PinataServices {
  protected axiosInstance: AxiosInstance;
  auth: any;

  constructor() {
    this.auth = config.PINATA_JWT;
    this.axiosInstance = axios.create({
      baseURL: config.PINATA_API_URL,
      timeout: 150000,
      timeoutErrorMessage: 'Time out!',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.addInterceptor(this.axiosInstance);
  }

  protected addInterceptor(instance: AxiosInstance): void {
    console.log("🚀 ~ file: pinata.ts:22 ~ PinataServices ~ config:")
    instance.interceptors.request.use(
      async (config) => {
        console.log("🚀 ~ file: pinata.ts:22 ~ PinataServices ~ config:", config)
        config.headers.Authorization = `Bearer ${this.auth}`;
        return config;
      },
      async (error) => {
        return await Promise.reject(error);
      }
    );
  }
  public async uploadImageToIPFS(image: any): Promise<any> { 
    console.log("🚀 ~ file: pinata.ts:34 ~ PinataServices ~ uploadImageToIPFS ~ image:", image)
    const options = {
      headers: {
        // 'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        'Authorization': `Bearer ${this.auth}`,
      }
    }
    const body = {
      file: image
    }
    return this.axiosInstance.post(`pinning/pinFileToIPFS`, body, options);
  }

}

const PinataService = new PinataServices();
export default PinataService