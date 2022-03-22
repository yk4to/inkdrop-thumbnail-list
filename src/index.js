'use babel'
import * as ThumbnailNoteListItemView from './ThumbnailNoteListItemView'

module.exports = {
  config: {
    keyName: {
      title: 'Key Name',
      description: 'You can overwrite thumbnail by adding this key to the front-matter.',
      type: 'string',
      default: 'thumbnail',
    },
    imageStyle: {
      title: 'Image Display Style',
      description: '',
      type: 'string',
      default: 'cover',
      enum: ['cover', 'contain'],
    },
    showSummary: {
      title: 'Show Summary',
      description: '',
      type: 'boolean',
      default: true,
    }
  },
  
  activate: () => {
    ThumbnailNoteListItemView.registerAsNoteListItemView()
  },

  deactivate: () => {
    ThumbnailNoteListItemView.unregisterAsNoteListItemView()
  }
}