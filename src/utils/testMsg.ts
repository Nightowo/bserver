import Cookies from 'js-cookie';
import {Session} from "/@/utils/storage";
//纯前端数据模拟
//用户数据
export const getApiUserInfo = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const userName = Cookies.get('userName');
            // 模拟数据
            let defaultRoles: Array<string> = [];
            let defaultAuthBtnList: Array<string> = [];
            // admin 页面权限标识，对应路由 meta.roles，用于控制路由的显示/隐藏
            let adminRoles: Array<string> = ['admin'];
            // admin 按钮权限标识
            let adminAuthBtnList: Array<string> = ['btn.add', 'btn.del', 'btn.edit', 'btn.link'];
            // test 页面权限标识，对应路由 meta.roles，用于控制路由的显示/隐藏
            let testRoles: Array<string> = ['common'];
            // test 按钮权限标识
            let testAuthBtnList: Array<string> = ['btn.add', 'btn.link'];
            // 不同用户模拟不同的用户权限
            if (userName === 'admin') {
                defaultRoles = adminRoles;
                defaultAuthBtnList = adminAuthBtnList;
            } else {
                defaultRoles = testRoles;
                defaultAuthBtnList = testAuthBtnList;
            }
            // 拼接用户信息模拟数据
            const userInfos = {
                userName: userName,
                photo:
                    userName === 'admin'
                        ? 'https://upload-bbs.miyoushe.com/upload/2023/06/20/82642572/dfba2e76f606de55268dbe9642156580_4737315992841300801.jpg?x-oss-process=image/resize,s_600/quality,q_80/auto-orient,0/interlace,1/format,jpg'
                        : 'https://upload-bbs.miyoushe.com/upload/2022/05/02/82642572/14d02bca1c45d29a6e937aae90a4bb86_2902681808342408337.jpg?x-oss-process=image/resize,s_600/quality,q_80/auto-orient,0/interlace,1/format,jpg',
                time: new Date().getTime(),
                roles: defaultRoles,
                authBtnList: defaultAuthBtnList,
            };
            Session.set('userInfo', userInfos);
            resolve(userInfos);
        }, 1000)
    })
}

export const getDemoData = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // data Ex: res.data
            const data = {
                name: 'demoTable',
                data: [
                    {
                        id: 1,
                        name: '张三',
                        age: 18,
                        sex: '男',
                        address: '北京',
                    },
                    {
                        id: 2,
                        name: '王五',
                        age: 19,
                        sex: '女',
                        address: '上海',
                    },
                    {
                        id: 3,
                        name: '李六',
                        age: 18,
                        sex: '男',
                        address: '北京',
                    },
                    {
                        id: 4,
                        name: '赵七',
                        age: 19,
                        sex: '女',
                        address: '上海',
                    },
                    {
                        id: 5,
                        name: '钱八',
                        age: 18,
                        sex: '男',
                        address: '北京',
                    },
                    {
                        id: 6,
                        name: '孙九',
                        age: 19,
                        sex: '女',
                        address: '上海',
                    },
                ]
            };
            resolve(data);
        }, 1000)
    })
}

export const getImages = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // data Ex: res.data
            const data = {
                name: 'demoImages',
                data: [
                    {
                        id: 1,
                        url: 'https://upload-bbs.miyoushe.com/upload/2025/01/12/82642572/6a49e22d4b16a06c624669ee88352e6f_1796018736517811158.jpg?x-oss-process=image/resize,s_600/quality,q_80/auto-orient,0/interlace,1/format,jpg',
                    },
                    {
                        id: 2,
                        url: 'https://upload-bbs.miyoushe.com/upload/2021/09/05/82642572/ae9ec2d861c689277d71c0e9e9f093a8_6623469552544362484.jpg?x-oss-process=image/resize,s_600/quality,q_80/auto-orient,0/interlace,1/format,jpg',
                    },
                    {
                        id: 3,
                        url: 'https://upload-bbs.miyoushe.com/upload/2022/11/03/82642572/865c185bdf0456e0f260db82ff262df2_2127951842747695065.jpg?x-oss-process=image/resize,s_600/quality,q_80/auto-orient,0/interlace,1/format,jpg'
                    },
                    {
                        id: 4,
                        url: 'https://upload-bbs.miyoushe.com/upload/2023/11/21/82642572/c28d41b5e415bf02681db4c71a41ca40_2509483050110626430.jpg?x-oss-process=image/resize,s_600/quality,q_80/auto-orient,0/interlace,1/format,jpg',
                    },
                    {
                        id: 5,
                        url: 'https://upload-bbs.miyoushe.com/upload/2021/04/27/82642572/83ccc0d47f8795ecfe1606d6333d6e94_4285792410380881514.jpg?x-oss-process=image/resize,s_600/quality,q_80/auto-orient,0/interlace,1/format,jpg',
                    },
                ]
            }
            resolve(data);
        }, 500);
    })
 }