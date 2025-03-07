import request from '/@/utils/request';
import * as url from "node:url";
/**
 * （不建议写成 request.post(xxx)，因为这样 post 时，无法 params 与 data 同时传参）
 *
 * 登录api接口集合
 * @method signIn 用户登录
 * @method signOut 用户退出登录
 */

export function userLogin() {
    return {
        login: (params: object) => {
            return request({
                method: 'POST',
                url: '/user/login',
                params,
            })
        },
        logout: (params: object) => {
            return request({
                url: '/user/logout',
                method: 'post',
                params,
            });
        },
    }
}