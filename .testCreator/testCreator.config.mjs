export default {
  COMPONENT_EXTS: ['tsx'],
  TEST_SUFFIX: 'test.tsx',
  TEMPLATE_PATH: '.testCreator/testTemplate.txt',
  ROOT_DIRS: ['./src/components', './src/pages', './src/shared'],
  EXCLUDE_NAME: 'test',
  ON_EXISTS: 'overwrite', // 'skip' | 'overwrite' | 'ask'
  PROPS_MAP_PATH: '.testCreator/testCreator.propsMap.mjs',
  RENDER_FUNCTION: 'renderWithProviders', // кастомный рендер
};
