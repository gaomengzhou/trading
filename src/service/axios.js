import axios from 'axios'; // 引入axios
import { showToast, showLoadingToast, showFailToast, closeToast } from 'vant';
import i18n from '@/i18n';
import { useRouter } from 'vue-router';
import store from "@/store/store";
import { useUserStore } from "@/store/user.js";

const router = useRouter()

class AxiosRequest {
  /**
   * @description Class AxiosRequest constructor.
   * @param {String} baseUrl Request base url.
   * @param {Object} headers Request headers config.
   * @param {Boolean} isLoading Request loading switch.
   */
  constructor(baseUrl, headers, isLoading) {
    this.baseUrl = baseUrl;
    this.headers = headers;
    this.isLoading = isLoading;
    this.queue = {};
  }

  /**
   * @description Get inside config.
   * @returns Inside config.
   */
  getInsideConfig() {
    const config = {
      // alert: Axios default base url param is "baseURL" not is "baseUrl" !
      baseURL: this.baseUrl,
      headers: this.headers,
      timeout: 10000
    }
    return config;
  }

  /**
   * @description Destroy completed request.
   * @param {String} url The completed request.
   */
  destroy(url) {
    delete this.queue[url];
    if (!Object.keys(this.queue).length) {
      // Present request complete.
      // Remove request loading.
      if (this.isLoading) {
        closeToast();
      }
    }
  }

  /**
   * @description The axios intercept.
   * @param {Function} instance Create axios get instance.
   * @param {String} url Request url.
   */
  interceptors(instance, url) {
    // Request intercept.
    instance.interceptors.request.use(
      config => {
        const userStore = useUserStore()
        const token = userStore.userInfo.token
        if (token) {
          if (!config.params) {
            config.params = {}
          }
          config.params.token = token;
          // console.log(config)
          // const METHOD = config.method.toUpperCase()
          // if (METHOD === 'GET') {
          //   if (!config.params) {
          //     config.params = {}
          //   }
          //   config.params.token = token;
          // } else if(METHOD === 'POST') {
          //   if (!config.data) {
          //     config.data = {}
          //   }
          //   config.data.token = token
          // } else {
          //   // TODO
          // }
        }
        if (!Object.keys(this.queue).length) {
          if (this.isLoading) {
            // Add request loading.
            showLoadingToast({
              duration: 0,
              forbidClick: true,
              loadingType: "spinner",
              message: i18n.global.t('加载中...')
            });
          }
          this.queue[url] = true;
        }
        return config;
      },
      error => {
        if (this.isLoading) {
          closeToast();
        }
        console.log(error, '错误')
        return Promise.reject(error);
      }
    );
    // Response intercept.
    instance.interceptors.response.use(
      result => {
        this.destroy(url);
        if (result.data.code == 0) {
          return result.data;
        } else if (result.data.code == 403) {
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
          store.commit('user/SET_OUT');
        } else {
          if (result.data.msg != undefined) { showToast(i18n.global.t(result.data.msg)); }
          return Promise.reject(result.data);
        }
      },
      error => {
        if (this.isLoading) {
          closeToast();
        }
        if (error.code == 'ERR_NETWORK') {
          showFailToast('ERR_NETWORK')
        } else if (error.code == 'ECONNABORTED') {
          //showFailToast('Network Timeout')
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * @description Axios request function.
   * @param {Object} options Axios request options.
   * @returns Create axios get instance.
   */
  request(options) {
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance, options.url);
    return instance(options);
  }
}

export default AxiosRequest;
