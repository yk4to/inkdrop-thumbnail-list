'use babel'
import * as ThumbnailNoteListItemView from './ThumbnailNoteListItemView'

module.exports = {
  config: {
    keyName: {
      title: 'Key Name',
      description: 'You can overwrite thumbnail by adding this key to the front-matter.',
      type: 'string',
      default: 'thumbnail',
    }
  },
  
  activate: () => {
    ThumbnailNoteListItemView.registerAsNoteListItemView()
  },

  deactivate: () => {
    ThumbnailNoteListItemView.unregisterAsNoteListItemView()
  }
}