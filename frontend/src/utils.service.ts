//Formatting

export const numberWithCommas = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const fixedPrice = (price: string) => {
  return parseFloat(price).toFixed(3);
};

export const fixedPercentage = (percentage: string) => {
  const percentageNumber = percentage.substring(0, percentage.length - 1);
  return parseFloat(percentageNumber).toFixed(3);
};

export const numberWithLetter = (number: number) => {
  if (isNaN(number)) return number;

  if (number < 9999) {
    return number;
  }

  if (number < 1000000) {
    return Math.round(number / 1000) + "K";
  }
  if (number < 10000000) {
    return (number / 1000000).toFixed(2) + "M";
  }

  if (number < 1000000000) {
    return Math.round(number / 1000000) + "M";
  }

  if (number < 1000000000000) {
    return Math.round(number / 1000000000) + "B";
  }

  return "1T+";
};

export const formatDataToChart = (chartData: any) => {
  return chartData.map((point: any) => {
    return point.price === 0 ? null : { time: point.time, price: point.price };
  });
};
