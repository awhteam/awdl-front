import { createReactPlayer } from './ReactPlayer'
import { lazy } from 'react'
import { supportsWebKitPresentationMode } from './utils'
import { canPlay, AUDIO_EXTENSIONS } from './patterns'
const fallback =  {
    key: 'file',
    name: 'FilePlayer',
    canPlay: canPlay.file,
    canEnablePIP: url => {
      return canPlay.file(url) && (document.pictureInPictureEnabled || supportsWebKitPresentationMode()) && !AUDIO_EXTENSIONS.test(url)
    },
    lazyPlayer: lazy(() => import(/* webpackChunkName: 'reactPlayerFilePlayer' */'./FilePlayer'))
  }


export default createReactPlayer(fallback)
