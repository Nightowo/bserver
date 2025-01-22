/**
 * 判断两数组字符串是否相同（用于按钮权限验证），数组字符串中存在相同时会自动去重（按钮权限标识不会重复）
 * @returns 两数组相同返回 `true`，反之则反
 * @param newArr
 * @param oldArr
 */
export function judgementSameArr(newArr: unknown[] | string[], oldArr: string[]): boolean {
	const news = removeDuplicate(newArr);
	const olds = removeDuplicate(oldArr);
	let count = 0;
	const len = news.length;
	for (let i in olds) {
		for (let j in news) {
			if (olds[i] === news[j]) count++;
		}
	}
	return count === len;
}

/**
 * 判断两个对象是否相同
 * @param a 要比较的对象一
 * @param b 要比较的对象二
 * @param depth 递归深度
 * @param maxDepth 最大递归深度
 * @returns 相同返回 true，反之则反
 */
export function isObjectValueEqual<T>(a: T, b: T, depth = 0, maxDepth = 100): boolean {
	if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) return false;

	// 防止递归过深
	if (depth > maxDepth) {
		throw new Error('Maximum recursion depth exceeded');
	}

	let aProps = Object.getOwnPropertyNames(a);
	let bProps = Object.getOwnPropertyNames(b);

	if (aProps.length != bProps.length) return false;
	aProps.forEach((key: any) => {
		if (!b.hasOwnProperty(key)) {
			return false;
		}
		let propA = a[key];
		let propB = b[key];
		if (typeof propA === 'object' && propA !== null && typeof propB === 'object' && propB !== null) {
			if (!isObjectValueEqual(propA, propB, depth + 1, maxDepth)) {
				return false;
			}
		} else if (propA !== propB) {
			return false;
		}
	})
	return true;
}

/**
 * 数组、数组对象去重
 * @param arr 数组内容
 * @param attr 需要去重的键值（数组对象）
 * @returns
 */
export function removeDuplicate(arr: EmptyArrayType, attr?: string) {
	if (!Object.keys(arr).length) {
		return arr;
	} else {
		if (attr) {
			// 检查 attr 是否存在且有效
			if (!attr) {
				return [];
			}
			const uniqueValues = new Set();
			const result: EmptyArrayType[] = [];

			if (Array.isArray(arr) && arr.length > 0) {
				for (const item of arr) {
					const value = item[attr];
					// 检查 item[attr] 是否存在且有效
					if (value !== undefined && value !== null) {
						if (!uniqueValues.has(value)) {
							uniqueValues.add(value);
							result.push(item);
						}
					}
				}
			}
			return result;
		} else {
			return [...new Set(arr)];
		}
	}
}
