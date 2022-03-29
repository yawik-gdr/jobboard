function convertToSlug(title)
{
  return title.toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

export default convertToSlug;
