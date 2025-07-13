import dayjs from "dayjs";

const FormatUtils = {
  vndPrice: (value) => {
    const validValue =
      isNaN(value) || value === null || value === undefined ? 0 : +value;
    return `${new Intl.NumberFormat().format(validValue)} VNĐ`;
  },

  formatDate: (date) => {
    const validDate = dayjs(date).isValid() ? dayjs(date) : dayjs();
    return validDate.format("DD/MM/YYYY");
  },

  formatDateYear: (date) => {
    const validDate = dayjs(date).isValid() ? dayjs(date) : dayjs();
    return validDate.format("DD/MM/YYYY");
  },

  formatDateTime: (date) => {
    const validDate = dayjs(date).isValid() ? dayjs(date) : dayjs();
    return validDate.format("DD/MM - HH:mm:ss");
  },

  formatFullDateTime: (date) => {
    const validDate = dayjs(date).isValid() ? dayjs(date) : dayjs();
    return validDate.format("DD/MM/YYYY - HH:mm:ss");
  },

  formatHour: (date) => {
    const validDate = dayjs(date).isValid() ? dayjs(date) : dayjs();
    return validDate.format("HH");
  },
};

export default FormatUtils;
