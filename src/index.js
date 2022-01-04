'use babel'
import * as ThumbnailNoteListItemView from './ThumbnailNoteListItemView'

module.exports = {
  activate: () => {
    ThumbnailNoteListItemView.registerAsNoteListItemView()
  },

  deactivate: () => {
    ThumbnailNoteListItemView.unregisterAsNoteListItemView()
  }
}