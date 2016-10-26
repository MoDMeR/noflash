import html from 'choo/html'
import closest from 'closest'
import ennemyItem from './ennemy-item'

let dragInfo

const indexOf = (el) => Array.prototype.indexOf.call(
  el.parentNode.childNodes, el)

const handleDragStart = (e) => {
  const list = closest(e.target, '.ennemy-list')
  list.addEventListener('mousemove', handleDragMove)
  list.addEventListener('mouseup', handleDragEnd)

  const listItem = closest(e.target, '.ennemy-item', true)

  dragInfo = {
    dragging: false,
    start: e.clientY,
    index: indexOf(listItem),
    list,
    listItem
  }
}

const handleDragMove = (e) => {
  const { list, listItem } = dragInfo

  if (!dragInfo.dragging && Math.abs(e.clientY - dragInfo.start) > 10) {
    listItem.classList.add('-dragging')
    dragInfo.dragging = true
  }

  if (dragInfo.dragging) {
    const hoverEl = document.elementFromPoint(e.clientX, e.clientY)
    const hoverItem = closest(e.target, '.ennemy-item', true)

    if (null != hoverItem) {
      const destIndex = indexOf(hoverItem)
      const destItem = hoverItem.nextElementSibling

      if (destIndex !== dragInfo.index) {
        list.insertBefore(listItem, destItem)
        dragInfo.index = destIndex
      }
    }
  }
}

const handleDragEnd = (e) => {
  const { list, listItem } = dragInfo

  listItem.classList.remove('-dragging')
  listItem.style.transform = ''

  list.removeEventListener('mousemove', handleDragMove)
  list.removeEventListener('mouseup', handleDragEnd)
}

export default (game, prev, send) => html`
  <ul class="ennemy-list">
    ${game.ennemies.map(ennemy => ennemyItem(ennemy, prev, send))}
  </ul>
`
