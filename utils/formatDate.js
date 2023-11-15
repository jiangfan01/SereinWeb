import moment from "moment";
import "moment/dist/locale/zh-cn"

/**
 * 日期格式化
 * @param date
 * @returns {string}
 */
const formatDate = (date) => {
  moment.locale("zh-cn")
  return moment(date).format("LL");
}

export default formatDate