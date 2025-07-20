import { defineStore } from "pinia";
import { Session } from "/@/utils/storage";
import { getApiUserInfo } from "/@/utils/testMsg";

/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useUserInfo = defineStore('userInfo', {
    state: (): UserInfosState => ({
        userInfos: {
            userName: '',
            photo: '',
            time: 0,
            roles: [],
            authBtnList: [],
        }
    }),
    actions: {
        async setUserInfo() {
            // 存储用户信息到浏览器缓存
            if (Session.get("userInfo")) {
                this.userInfos = Session.get("userInfo");
            } else {
                this.userInfos = <UserInfos>await getApiUserInfo();
            }
        }
    }
})