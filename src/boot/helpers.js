const helpers = {
  removeSpecialCharacters(value)
  {
    return value.replace(/[^a-zA-Z0-9 ]/g, '');
  }
};
export default ({ app }) =>
{
  app.config.globalProperties.$helpers = helpers;
};
export { helpers };
