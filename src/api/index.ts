import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { message } from "antd";

// * 请求响应参数(不包含data)
interface Result {
  code: string;
  msg: string;
}

// * 请求响应参数(包含data)
interface ResultData<T = any> extends Result {
  data?: T;
}

const config = {
  // 默认地址请求地址，可在 .env 开头文件中修改
  // @ts-ignore
  baseURL: import.meta.env.VITE_API_URL as string,
  // 设置超时时间（10s）
  timeout: 10000,
  // 跨域时候允许携带凭证
  withCredentials: true,
};

class RequestHttp {
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    // 实例化axios
    this.service = axios.create(config);

    /**
     * @description 请求拦截器
     */
    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        return { ...config, headers: { ...config.headers } };
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    /**
     * @description 响应拦截器
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data, config } = response;

        // * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
        if (data.code === 0) {
          return data.data;
        }
        message.error(data.message);
        return Promise.reject(data);
      },
      async (error: AxiosError) => {
        // 请求超时单独判断，请求超时没有 response
        if (error.message.indexOf("timeout") !== -1)
          message.error("请求超时，请稍后再试");
        return Promise.reject(error);
      }
    );
  }

  // * 常用请求方法封装
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object });
  }
  post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object);
  }
  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _object);
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object });
  }
}

export default new RequestHttp(config);
