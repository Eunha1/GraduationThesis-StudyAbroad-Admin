export const extractFilename = (url) => {
  const parts = url.split('/');
  const filename = parts[parts.length - 1];

  return filename;
};
export const extractOriginalFilename = (url) => {
  const parts = url.split('/');
  const filename = parts[parts.length - 1];
  const originalFilename = filename.split('-')[1];
  return originalFilename;
};
export const extractTimestampAndConvertToDate = (url) => {
  // get image name
  const imageName = extractFilename(url);
  // get timestamp string
  const parts = imageName.split('-');
  const timestampString = parts[0];
  // parse to number
  const timestampNumber = parseInt(timestampString);
  const date = new Date(timestampNumber);
  // format date
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${day}/${month}/${year}-${hours}:${minutes}:${seconds}`;
};

export const convertDate = (time) => {
  const date = new Date(time);
  // format date
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${day}/${month}/${year}-${hours}:${minutes}:${seconds}`;
};
