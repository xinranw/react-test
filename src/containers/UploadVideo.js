import React from 'react'
import { connect } from 'react-redux'
import { setVideoUrl } from '../actions'

const VideoUploader = ({ dispatch }) => {
  return (
    <div>
      <label htmlFor="uploadVideo" className="ui labeled icon button">
        <i className="icon upload"></i>
          Upload Video
      </label>
      <input id="uploadVideo"
             className="input-file"
             type="file"
             accept="video/*"
             onChange={ (e) => {
               const file = e.target.files[0]
               const type = file.type
               const fileURL = URL.createObjectURL(file)
               dispatch(setVideoUrl(fileURL))
             }} />
    </div>
  )
}

const UploadVideo = connect()(VideoUploader)

export default UploadVideo