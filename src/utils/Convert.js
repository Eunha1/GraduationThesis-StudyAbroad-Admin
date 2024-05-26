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
export const extractExtension = (fileName) => {
  const extension = fileName.split('.').pop();
  return extension;
};

export const extractExtensionFromURL = (url) => {
  const parts = url.split('/');
  const filename = parts[parts.length - 1];
  const originalFilename = filename.split('-')[1];
  const extension = originalFilename.split('.').pop();
  return extension;
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

export const extractPathNameFromURL = (url) => {
  const parseURL = new URL(url);

  return parseURL.pathname.slice(1);
};

export const  sanitizeTitle = (title) => {
  if (!title) {
      return '';
  }
  let slug = "";
  // Change to lower case
  const titleLower = title.toLowerCase();
  // Letter "e"
  slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e');
  // Letter "a"
  slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a');
  // Letter "o"
  slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o');
  // Letter "u"
  slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u');
  // Letter "i"
  slug = slug.replace(/i|í|ì|ĩ|ỉ|ị/gi, 'i');
  // // Letter "y"
  slug = slug.replace(/y|ý|ỳ|ỹ|ỷ|ỵ/gi, 'y');
  // // Letter "d"
  slug = slug.replace(/đ/gi, 'd');
  // Trim the last whitespace
  slug = slug.replace(/\s*$/g, '');
  slug = slug.replace(/\?|\(|\)|!|@|#|\$|%|\^|&|:|;|,|=|-|”|“|/g, '');
  slug = slug.replace(/[.'`":*?<>{}+"]/g,'');
  slug = slug.replace(/[/]/g,'-');
  // Change whitespace, whitespace + "-" , "-" + whitespace to "-"
  slug = slug.replace(/\s+-/g, '-');
  slug = slug.replace(/-\s+/g, '-');
  slug = slug.replace(/\s+/g, '-');
  return slug;
}
