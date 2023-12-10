import * as ThumbnailNoteListItemView from './ThumbnailNoteListItemView'

module.exports = {
  config: {
    keyName: {
      title: 'Key Name',
      description:
        'You can overwrite thumbnail by adding this key to the front-matter.',
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
      description:
        'Thumbnail background color code (e.g. `#ffffff`, `transparent`)',
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
    ThumbnailNoteListItemView.registerAsNoteListItemView()
  },

  deactivate: () => {
    ThumbnailNoteListItemView.unregisterAsNoteListItemView()
  }
}
