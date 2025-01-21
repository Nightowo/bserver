import useClipboard from 'vue-clipboard3';
import {formatDate} from "/@/utils/formatTime";
import {ElMessage} from "element-plus";

export const commonFunctions = ()=> {
    // 剪贴板Clipboard导入
    const { toClipboard } = useClipboard();

    // 通用工具函数
    // 1. 百分比格式化 in: 10/null -> out: 10%/-
    const percentFormat = (value: string) => {
        return value? `${value}%` : '-';
    }

    // 2. 日期格式化1 in <Date> -> 2023-01-01
    const dateFormatYMD = (value: string) => {
        if (!value) return '-';
        return formatDate(new Date(value), 'YYYY-mm-dd');
    };

    // 3. 日期格式化2 in <Date> -> 2023-01-01 00:00:00
    const dateFormatYMDHMS = (value: string) => {
        if (!value) return '-';
        return formatDate(new Date(value), 'YYYY-mm-dd HH:MM:SS');
    };

    // 4. 时间格式化3 in <Date> -> 00:00:00</Date>
    const dateFormatHMS = (row: any, value: any) => {
        if (!value) return '-';
        let time = 0;
        if (typeof row === 'number') time = row;
        if (typeof value === 'number') time = value;
        return formatDate(new Date(time * 1000), 'HH:MM:SS');
    };

    // 5. 小数格式化1, 保留小数点后scale位（默认4位）
    const scaleFormat = (value: string = '0', scale: number = 4) => {
        return Number.parseFloat(value).toFixed(scale);
    };

    // 6. 小数格式化2，保留小数点后2位
    const scale2Format = (value: string = '0') => {
        return Number.parseFloat(value).toFixed(2);
    };

    // 7. 点击复制文本
    const copyText = (text: string) => {
        return new Promise((resolve, reject) => {
            try {
                //复制
                toClipboard(text).then(r => {});
                //下面可以设置复制成功的提示框等操作
                //ElMessage.success(t('message.layout.copyTextSuccess'));
                ElMessage.success('复制成功');
                resolve(text);
            } catch (e) {
                //复制失败
                //ElMessage.error(t('message.layout.copyTextError'));
                ElMessage.error('复制失败');
                reject(e);
            }
        });
    };

    return {
        percentFormat,
        dateFormatYMD,
        toClipboard,
        dateFormatYMDHMS,
        dateFormatHMS,
        scaleFormat,
        scale2Format,
        copyText,
    }
}