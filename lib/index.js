"use strict";

var ThumbnailNoteListItemView = _interopRequireWildcard(require("./ThumbnailNoteListItemView"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
module.exports = {
  config: {
    keyName: {
      title: 'Key Name',
      description: 'You can overwrite thumbnail by adding this key to the front-matter.',
      type: 'string',
      default: 'thumbnail'
    },
    imageStyle: {
      title: 'Image Display Style',
      description: '',
      type: 'string',
      default: 'cover',
      enum: ['cover', 'contain']
    },
    showSummary: {
      title: 'Show Summary',
      description: '',
      type: 'boolean',
      default: true
    },
    bgColor: {
      title: 'Background Color',
      description: 'Thumbnail background color code (e.g. `#ffffff`, `transparent`)',
      type: 'string',
      default: '#ffffff'
    },
    showEmoji: {
      title: 'Show Emoji',
      description: 'It Shows emoji set in the front-matter before the title.',
      type: 'boolean',
      default: false
    },
    emojiKeyName: {
      title: 'Emoji Key Name',
      description: "If 'Show Emoji' is enabled, it uses the value of this key.",
      type: 'string',
      default: 'emoji'
    }
  },
  activate: () => {
    ThumbnailNoteListItemView.registerAsNoteListItemView();
  },
  deactivate: () => {
    ThumbnailNoteListItemView.unregisterAsNoteListItemView();
  }
};