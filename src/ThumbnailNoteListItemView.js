'use babel'
import * as React from 'react'
import { useCallback } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import classNames from 'classnames'
const matter = require('gray-matter')

dayjs.extend(relativeTime)

export default function ThumbnailNoteListItemView(props) {
  const NoteStatusIcon = inkdrop.components.getComponentClass('NoteStatusIcon')
  const NoteListItemShareStatusView = inkdrop.components.getComponentClass(
    'NoteListItemShareStatusView'
  )
  const TaskProgressView = inkdrop.components.getComponentClass(
    'TaskProgressView'
  )
  const TagList = inkdrop.components.getComponentClass('TagList')

  const { active, focused, note, onClick, onDblClick, onContextMenu } = props
  const {
    title,
    status,
    updatedAt,
    share,
    numOfTasks,
    numOfCheckedTasks,
    tags,
    body
  } = note

  const {content, data} = matter(body)

  // const match = body.match(/.*<img .*src="(.*[^\"])".*>.*|\!\[.*]\( *([^ ]+) *(?:[ ]+"[^"]*")?\)/)
  const match = body.match(/!\[[^\]]*\]\((?<filename>.*?)(?=\"|\))(?<optionalpart>\".*\")?\)/)
  
  let imageUrl = data[inkdrop.config.get('thumbnail-list.keyName') ?? "thumbnail"]

  if (!imageUrl && match && match.length > 2) {
    const url = match[1] ?? match[2]
    imageUrl = url.replace(/^inkdrop:\/\/file:/,'inkdrop-file://file:')
  }

  const ThumbnailView = () => {
    if (imageUrl) {
      return (
        <div className="thumbnail">
          <div className="wrapper">
            <img  className="image" src={imageUrl} />
          </div>
        </div>
      )
    }
  }
  const classes = classNames({
    'thumbnail-note-list-item-view': true,
    'note-list-item-view': true,
    active,
    focused,
    task: status !== 'none',
    'has-thumbnail': imageUrl !== undefined,
  })
  const date = dayjs(updatedAt).fromNow(true)
  const taskState = status ? `task-${status}` : ''
  const isTask = typeof numOfTasks === 'number' && numOfTasks > 0

  const handleClick = useCallback(
    e => {
      onClick && onClick(e, note)
      e.preventDefault()
      e.stopPropagation()
    },
    [onClick, note]
  )

  const handleDblClick = useCallback(
    e => {
      onDblClick && onDblClick(e, note)
      e.preventDefault()
      e.stopPropagation()
    },
    [onDblClick, note]
  )

  const handleContextMenu = useCallback(
    e => {
      onContextMenu && onContextMenu(e, note)
      e.preventDefault()
      e.stopPropagation()
    },
    [onContextMenu, note]
  )

  return (
    <div
      className={`${classes} ${taskState}`}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onDoubleClick={handleDblClick}
    >
      <div className="content">
        <div className="header">
          <NoteStatusIcon status={status} />
          <NoteListItemShareStatusView visibility={share} />
          {title || 'Untitled'}
        </div>
        <div className="description">
          <div className="meta">
            <span className="date">{date}</span>
            {isTask && (
              <TaskProgressView
                numOfTasks={numOfTasks || 0}
                numOfCheckedTasks={numOfCheckedTasks || 0}
              />
            )}
            <TagList tagIds={tags} />
          </div>
          {/* <span className="text">{plainBody}</span> */}
        </div>
      </div>
      {ThumbnailView()}
    </div>
  )
}

export function registerAsNoteListItemView() {
  inkdrop.components.registerClass(
    ThumbnailNoteListItemView,
    'CustomNoteListItemView'
  )
}

export function unregisterAsNoteListItemView() {
  inkdrop.components.deleteClass(
    ThumbnailNoteListItemView.default,
    'CustomNoteListItemView'
  )
}
