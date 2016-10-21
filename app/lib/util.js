export const renderIf = (condition, state, renderer) => condition
  ? renderer(state)
  : ''
