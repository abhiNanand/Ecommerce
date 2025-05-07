export const calculateTimeLeft = (
  targetTime = new Date().setHours(23, 59, 59, 999)
) => {
  const now = new Date().getTime();
  const difference = targetTime - now;

  if (difference <= 0) {
    return { days: '00', hours: '00', minutes: '00', seconds: '00' };
  }
  // the difference is in millisecond that why dividing by 10000
  return {
    Days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(
      2,
      '0'
    ),
    Hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(
      2,
      '0'
    ),
    Minutes: String(Math.floor((difference / (1000 * 60)) % 60)).padStart(
      2,
      '0'
    ),
    Seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'),
  };
};

export const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  formik: any
) => {
  const fieldName = e.target.name;
  let processedValue = e.target.value;
  processedValue = processedValue.replace(/^\s+/g, '');
  formik.setFieldValue(fieldName, processedValue);
};

export const handleChangePassword = (
  e: React.ChangeEvent<HTMLInputElement>,
  formik: any
) => {
  const fieldName = e.target.name;
  let processedValue = e.target.value;
  processedValue = processedValue.replace(/\s/g, '');
  formik.setFieldValue(fieldName, processedValue);
};
