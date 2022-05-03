const helpers = {
  removeSpecialCharacters(value)
  {
    return value.replace(/[^a-zA-Z0-9 ]/g, '');
  },
  addDays(date, days)
  {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  },
};
export default ({ app }) =>
{
  app.config.globalProperties.$helpers = helpers;
};
export { helpers };
