export default ({ app }) => {
  const loggedIn = localStorage.getItem('loggedIn') === 'true';
  app.config.globalProperties.$loggedIn = loggedIn;
};
