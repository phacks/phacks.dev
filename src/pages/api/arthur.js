import { get } from '@vercel/blob'
import { createGiftDownloadHandler } from '../../lib/giftDownload.mjs'

export default createGiftDownloadHandler({ readBlob: get })
