const environment = () => {
  let config = {};
  if (process.env.NODE_ENV === "development") {
    config.url = process.env.REACT_APP_LOCAL_API;
  } else {
    config.url = process.env.REACT_APP_API;
  }
  return config;
};

const config = environment();

export default config;
