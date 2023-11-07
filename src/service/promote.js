import { httpJson } from "@/service/http";
//我的推广
const promote = (params) => {
    return httpJson({
        url: "api/api/promote!getPromote.action",
        method: "get",
        // isLoading: true
    }, params)
};
//获取我的分享信息
const localuser = (params) => {
    return httpJson({
        url: "api/api/user/getShare.action",
        method: "get",
        isLoading: false
    }, params)
};


const apiList = {
    promote,
    localuser,
}

export default apiList
