"use strict";

var ThumbnailNoteListItemView = _interopRequireWildcard(require("./ThumbnailNoteListItemView"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
    }
  },
  activate: () => {
    ThumbnailNoteListItemView.registerAsNoteListItemView();
  },
  deactivate: () => {
    ThumbnailNoteListItemView.unregisterAsNoteListItemView();
  }
};