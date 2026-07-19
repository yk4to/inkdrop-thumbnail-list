import classNames from 'classnames'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { extractImgUrl } from 'extract-img-url'
import type { Note } from 'inkdrop-model'
import type React from 'react'
import { useCallback } from 'react'
import matter from 'white-matter'

dayjs.extend(relativeTime)

const NOTE_CONTENT_CACHE_LIMIT = 500
const noteContentCache = new Map<string, NoteContent>()

interface HighlightMarkPosition {
  offStart: number
  offEnd: number
  line: number
  chStart: number
  chEnd: number
}

interface NoteWithFtsData extends Note {
  _fts?: {
    titleHighlights: HighlightMarkPosition[]
    bodyHighlights: HighlightMarkPosition[]
  }
}

interface NoteContent {
  data: Record<string, unknown>
  imageUrl?: string
}

interface ThumbnailNoteListItemViewProps {
  listSortKey: string
  note: NoteWithFtsData
  focused: boolean
  active: boolean
  onClick?: (e: React.MouseEvent, note: NoteWithFtsData) => void
  onMiddleClick?: (e: React.MouseEvent, note: NoteWithFtsData) => void
  onDblClick?: (e: React.MouseEvent, note: NoteWithFtsData) => void
  onContextMenu?: (e: React.MouseEvent, note: NoteWithFtsData) => void
  onTagListItemClick?: (e: React.MouseEvent, tagId: string) => void
}

function normalizeImageUrl(imageUrl: string | undefined) {
  return imageUrl?.replace(/^inkdrop:\/\/file:/, 'inkdrop-file://')
}

function readNoteContent(note: NoteWithFtsData): NoteContent {
  const cacheKey = note._rev ?? note.body ?? ''
  const cached = noteContentCache.get(cacheKey)
  if (cached) {
    noteContentCache.delete(cacheKey)
    noteContentCache.set(cacheKey, cached)
    return cached
  }

  const body = note.body ?? ''
  const { data } = matter(body)
  const content = {
    data,
    imageUrl: normalizeImageUrl(extractImgUrl(body))
  }

  noteContentCache.set(cacheKey, content)
  if (noteContentCache.size > NOTE_CONTENT_CACHE_LIMIT) {
    const oldestKey = noteContentCache.keys().next().value
    if (oldestKey !== undefined) noteContentCache.delete(oldestKey)
  }

  return content
}

export default function ThumbnailNoteListItemView(props: ThumbnailNoteListItemViewProps) {
  const StreamlineIcon = inkdrop.components.getComponentClass('StreamlineIcon')!
  const NoteStatusIcon = inkdrop.components.getComponentClass('NoteStatusIcon')!
  const HighlightedText = inkdrop.components.getComponentClass('HighlightedText')!
  const NoteListItemShareStatusView = inkdrop.components.getComponentClass(
    'NoteListItemShareStatusView'
  )!
  const TaskProgressView = inkdrop.components.getComponentClass('TaskProgressView')!
  const TagList = inkdrop.components.getComponentClass('TagList')!
  const NoteListItemSummaryView = inkdrop.components.getComponentClass('NoteListItemSummaryView')!

  const {
    listSortKey,
    active,
    focused,
    note,
    onClick,
    onDblClick,
    onContextMenu,
    onMiddleClick,
    onTagListItemClick
  } = props
  const {
    _rev,
    title = 'Untitled',
    body,
    status,
    updatedAt,
    createdAt,
    share,
    numOfTasks,
    numOfCheckedTasks,
    tags,
    pinned,
    _conflicts
  } = note

  const ftsData = note._fts
  const { data, imageUrl: extractedImageUrl } = readNoteContent(note)

  const showEmoji = inkdrop.config.get('thumbnail-list.showEmoji')
  const emojiKey = inkdrop.config.get('thumbnail-list.emojiKeyName') ?? 'emoji'
  const configuredEmoji = showEmoji ? data[String(emojiKey)] : undefined
  const emoji = typeof configuredEmoji === 'string' ? configuredEmoji : undefined

  let imageUrl = extractedImageUrl
  const thumbnailKey = inkdrop.config.get('thumbnail-list.keyName') ?? 'thumbnail'
  const configuredThumbnail = data[String(thumbnailKey)]
  if (typeof configuredThumbnail === 'string') imageUrl = configuredThumbnail

  const imageStyle = inkdrop.config.get('thumbnail-list.imageStyle')
  const showSummary = inkdrop.config.get('thumbnail-list.showSummary')
  const bgColor = inkdrop.config.get('thumbnail-list.bgColor')

  const classes = classNames({
    'thumbnail-note-list-item-view': true,
    'note-list-item-view': true,
    active,
    focused,
    task: status !== 'none',
    'has-thumbnail': !!imageUrl
  })

  const timestamp = listSortKey === 'createdAt' ? createdAt : updatedAt
  const fmt = dayjs(timestamp)
  const date =
    updatedAt >= +new Date() - 1000 * 60 * 60 * 24 * 37
      ? fmt.fromNow(true)
      : fmt.format('YYYY-MM-DD')
  const taskState = status ? `task-${status}` : ''
  const isTask = typeof numOfTasks === 'number' && numOfTasks > 0

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      onClick?.(e, note)
      e.preventDefault()
      e.stopPropagation()
    },
    [onClick, note]
  )

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button === 1) {
        onMiddleClick?.(e, note)
        e.preventDefault()
        e.stopPropagation()
      }
    },
    [onMiddleClick, note]
  )

  const handleDblClick = useCallback(
    (e: React.MouseEvent) => {
      onDblClick?.(e, note)
      e.preventDefault()
      e.stopPropagation()
    },
    [onDblClick, note]
  )

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      onContextMenu?.(e, note)
      e.preventDefault()
    },
    [onContextMenu, note]
  )

  return (
    <div
      className={`${classes} ${taskState}`}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onDoubleClick={handleDblClick}
      onMouseDown={handleMouseDown}
    >
      <div className="content">
        <div className="header">
          {_conflicts && (
            <StreamlineIcon name="warning-bold" className="note-conflicted-icon inline" />
          )}
          {pinned && <StreamlineIcon name="pin-bold" className="note-pin-icon inline" />}
          <NoteStatusIcon status={status} />
          <NoteListItemShareStatusView visibility={share} />
          {emoji && `${emoji} `}
          {ftsData ? (
            <HighlightedText highlights={ftsData.titleHighlights}>{title}</HighlightedText>
          ) : (
            title
          )}
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
            <TagList tagIds={tags} onClickItem={onTagListItemClick} />
          </div>
          {showSummary && (
            <NoteListItemSummaryView
              revId={_rev || ''}
              body={body}
              highlights={ftsData?.bodyHighlights}
            />
          )}
        </div>
      </div>
      {imageUrl && (
        <div className="thumbnail">
          <div className="wrapper" style={{ backgroundColor: String(bgColor) }}>
            <img className={`image ${imageStyle}`} src={imageUrl} />
          </div>
        </div>
      )}
    </div>
  )
}

export function registerAsNoteListItemView() {
  inkdrop.components.registerClass(
    ThumbnailNoteListItemView as React.ComponentType,
    'CustomNoteListItemView'
  )
}

export function unregisterAsNoteListItemView() {
  inkdrop.components.deleteClass(
    ThumbnailNoteListItemView as React.ComponentType,
    'CustomNoteListItemView'
  )
}
