export const getConfig = () => {
  return {
    poemBasePath: process.env.REMOTION_POEM_BASE_PATH || 'default/poem1/path/',
    layout: process.env.REMOTION_LAYOUT || 'vertical'
  };
};
