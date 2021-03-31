// Source maps are resource heavy and can cause out of memory issue for large source files.
export const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
export const isEnvDevelopment = process.env.NODE_ENV === 'development';
export const isEnvProduction = process.env.NODE_ENV === 'production';
