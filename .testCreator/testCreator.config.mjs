export default {
  COMPONENT_EXTS: ['tsx'],
  TEST_SUFFIX: 'test.tsx',
  TEMPLATE_PATH: '.testCreator/testTemplate.txt',
  ROOT_DIRS: ['./src/components', './src/pages', './src/shared'],
  EXCLUDE_NAME: 'test',
  ON_EXISTS: 'overwrite', // 'skip' | 'overwrite' | 'ask'
  RENDER_FUNCTION: 'renderWithProviders', // кастомный рендер
};
