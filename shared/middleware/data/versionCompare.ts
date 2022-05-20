
/**
 * versionStringCompare 版本号比较
 * @function versionStringCompare
 * @version 0.0.1
 * @author by zsf on 2022/04/06
 * @Copyright © 2019 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */
export const versionStringCompare = (preVersion, lastVersion) => {
  const sources = preVersion?.split('.');
  const dests = lastVersion?.split('.');
  const maxL = Math.max(sources?.length, dests?.length);
  let result = 0;
  for (let i = 0; i < maxL; i++) {
    const preValue = sources.length > i ? sources[i] : 0;
    const preNum = isNaN(Number(preValue)) ? preValue?.charCodeAt() : Number(preValue);
    const lastValue = dests.length > i ? dests[i] : 0;
    const lastNum = isNaN(Number(lastValue)) ? lastValue?.charCodeAt() : Number(lastValue);
    if (preNum < lastNum) {
      result = -1;
      break;
    } else if (preNum > lastNum) {
      result = 1;
      break;
    }
  }
  return result;
};
