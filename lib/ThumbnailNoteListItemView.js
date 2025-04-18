"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ThumbnailNoteListItemView;
exports.registerAsNoteListItemView = registerAsNoteListItemView;
exports.unregisterAsNoteListItemView = unregisterAsNoteListItemView;
var _react = _interopRequireWildcard(require("react"));
var _dayjs = _interopRequireDefault(require("dayjs"));
var _relativeTime = _interopRequireDefault(require("dayjs/plugin/relativeTime"));
var _classnames = _interopRequireDefault(require("classnames"));
var _whiteMatter = _interopRequireDefault(require("white-matter"));
var _extractImgUrl = require("extract-img-url");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
_dayjs.default.extend(_relativeTime.default);
function ThumbnailNoteListItemView(props) {
  const StreamlineIcon = inkdrop.components.getComponentClass('StreamlineIcon');
  const NoteStatusIcon = inkdrop.components.getComponentClass('NoteStatusIcon');
  const HighlightedText = inkdrop.components.getComponentClass('HighlightedText');
  const NoteListItemShareStatusView = inkdrop.components.getComponentClass('NoteListItemShareStatusView');
  const TaskProgressView = inkdrop.components.getComponentClass('TaskProgressView');
  const TagList = inkdrop.components.getComponentClass('TagList');
  const NoteListItemSummaryView = inkdrop.components.getComponentClass('NoteListItemSummaryView');
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
  } = props;
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
  } = note;
  const ftsData = note._fts;
  const {
    data
  } = (0, _whiteMatter.default)(body);
  const showEmoji = inkdrop.config.get('thumbnail-list.showEmoji');
  const emojiKey = inkdrop.config.get('thumbnail-list.emojiKeyName') ?? 'emoji';
  const emoji = showEmoji ? data?.[emojiKey] : undefined;
  let imageUrl = (0, _extractImgUrl.extractImgUrl)(body)?.replace(/^inkdrop:\/\/file:/, 'inkdrop-file://');
  const thumbnailKey = inkdrop.config.get('thumbnail-list.keyName') ?? 'thumbnail';
  if (data?.[thumbnailKey] !== undefined) {
    imageUrl = data[thumbnailKey];
  }
  const imageStyle = inkdrop.config.get('thumbnail-list.imageStyle');
  const showSummary = inkdrop.config.get('thumbnail-list.showSummary');
  const bgColor = inkdrop.config.get('thumbnail-list.bgColor');
  const ThumbnailView = () => {
    if (imageUrl) {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "thumbnail"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "wrapper",
        style: {
          backgroundColor: bgColor
        }
      }, /*#__PURE__*/_react.default.createElement("img", {
        className: `image ${imageStyle}`,
        src: imageUrl
      })));
    }
  };
  const classes = (0, _classnames.default)({
    'thumbnail-note-list-item-view': true,
    'note-list-item-view': true,
    active,
    focused,
    task: status !== 'none',
    'has-thumbnail': !!imageUrl
  });
  const timestamp = listSortKey === 'createdAt' ? createdAt : updatedAt;
  const fmt = (0, _dayjs.default)(timestamp);
  const date = updatedAt >= +new Date() - 1000 * 60 * 60 * 24 * 37 ? fmt.fromNow(true) : fmt.format('YYYY-MM-DD');
  const taskState = status ? `task-${status}` : '';
  const isTask = typeof numOfTasks === 'number' && numOfTasks > 0;
  const handleClick = (0, _react.useCallback)(e => {
    onClick && onClick(e, note);
    e.preventDefault();
    e.stopPropagation();
  }, [onClick, note]);
  const handleMouseDown = (0, _react.useCallback)(e => {
    if (e.button === 1) {
      onMiddleClick && onMiddleClick(e, note);
      e.preventDefault();
      e.stopPropagation();
    }
  }, [onMiddleClick, note]);
  const handleDblClick = (0, _react.useCallback)(e => {
    onDblClick && onDblClick(e, note);
    e.preventDefault();
    e.stopPropagation();
  }, [onDblClick, note]);
  const handleContextMenu = (0, _react.useCallback)(e => {
    onContextMenu && onContextMenu(e, note);
    e.preventDefault();
  }, [onContextMenu, note]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: `${classes} ${taskState}`,
    onClick: handleClick,
    onContextMenu: handleContextMenu,
    onDoubleClick: handleDblClick,
    onMouseDown: handleMouseDown
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "content"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "header"
  }, _conflicts && /*#__PURE__*/_react.default.createElement(StreamlineIcon, {
    name: "warning-bold",
    className: "note-conflicted-icon inline"
  }), pinned && /*#__PURE__*/_react.default.createElement(StreamlineIcon, {
    name: "pin-bold",
    className: "note-pin-icon inline"
  }), /*#__PURE__*/_react.default.createElement(NoteStatusIcon, {
    status: status
  }), /*#__PURE__*/_react.default.createElement(NoteListItemShareStatusView, {
    visibility: share
  }), emoji && `${emoji} `, ftsData ? /*#__PURE__*/_react.default.createElement(HighlightedText, {
    highlights: ftsData.titleHighlights
  }, title) : title), /*#__PURE__*/_react.default.createElement("div", {
    className: "description"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "meta"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "date"
  }, date), isTask && /*#__PURE__*/_react.default.createElement(TaskProgressView, {
    numOfTasks: numOfTasks || 0,
    numOfCheckedTasks: numOfCheckedTasks || 0
  }), /*#__PURE__*/_react.default.createElement(TagList, {
    tagIds: tags,
    onClickItem: onTagListItemClick
  })), showSummary && /*#__PURE__*/_react.default.createElement(NoteListItemSummaryView, {
    revId: _rev || '',
    body: body,
    highlights: ftsData?.bodyHighlights
  }))), ThumbnailView());
}
function registerAsNoteListItemView() {
  inkdrop.components.registerClass(ThumbnailNoteListItemView, 'CustomNoteListItemView');
}
function unregisterAsNoteListItemView() {
  inkdrop.components.deleteClass(ThumbnailNoteListItemView.default, 'CustomNoteListItemView');
}