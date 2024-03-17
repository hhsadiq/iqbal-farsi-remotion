// config.ts
export const getConfig = () => {
  return {
    poemBasePath: process.env.REMOTION_POEM_BASE_PATH || 'default/poem1/path/',
  };
};
