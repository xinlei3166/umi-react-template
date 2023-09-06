import { useState } from 'react'
import { Card } from 'antd'
import { ReactSortable } from 'react-sortablejs'
import './index.less'

interface Fruit {
  name: string
  id: number
}

export default function RouterPage() {
  const sortableOptions = {
    scroll: true,
    animation: 500,
    group: 'group',
    ghostClass: 'sortable-ghost',
    dragClass: 'sortable-ghost',
    handle: '.sortable-handle',
    filter: '.sortable-ignore-elements',
    preventOnFilter: false,
    draggable: '.sortable-draggable',
    fallbackTolerance: 5
  }

  const [state, setState] = useState<Fruit[]>([
    { name: 'apple', id: 1 },
    { name: 'banana', id: 2 },
    { name: 'watermelon', id: 3 },
    { name: 'orange', id: 4 },
    { name: 'peach', id: 5 }
  ])

  const [drag, setDrag] = useState(false)

  function onDragStart() {
    setDrag(true)
    window.scrollTo(0, 0)
  }

  function onDragEnd() {
    setDrag(false)
  }

  return (
    <Card className="h-full">
      <div className="title">Sortable</div>
      <div className="sortable-wrap ml-16">
        <ReactSortable
          list={state}
          setList={setState}
          tag="div"
          {...sortableOptions}
          onStart={onDragStart}
          onEnd={onDragEnd}
        >
          {state.map(item => (
            <div
              className="row sortable-draggable sortable-handle"
              key={item.id}
            >
              {item.name}
            </div>
          ))}
        </ReactSortable>
      </div>
    </Card>
  )
}
