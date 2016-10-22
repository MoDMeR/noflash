export default function renderIf(condition, state, renderer) {
  return (condition ? renderer(state) : '')
}
