// export function getCoverImg (state) {
//   let arr = []
//   let canvas = document.createElement('canvas')
//   let video = document.createElement('video')
//   // 使用 var 获不到 loadeddata 函数中的值
//   // var coverImg = null
//   video.setAttribute('preload', 'auto')
//   video.setAttribute('crossOrigin', 'Anonymous')
//   video.addEventListener('loadeddata', () => {
//     canvas.width = video.videoWidth
//     canvas.height = video.videoHeight
//     console.log(canvas.width)
//     console.log(canvas.height)
//     canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
//     canvas.toDataURL('image/png')
//   })
//   for (let i = 0; i < state.userThumb.length; i++) {
//     // 加入时间戳
//     video.src = state.userThumb[i].src + '?time=' + new Date().valueOf()
//     // arr.push(coverImg)
//   }
//   return arr
// }

// 获取视频类型数组
export function TransformVideoType (state) {
  let arr = []
  for (let i = 0; i < state.videoType.length; i++) {
    let type = state.videoType[i].type
    arr[i] = new Object()
    Object.defineProperties(arr[i], {
      'id': {
        value: state.videoType[i].id,
        writable: false
      },
      'label': {
        value: state.videoType[i].type,
        writable: false
      },
      'value': {
        value: state.videoType[i].type,
        writable: false
      }
    })
  }
  return arr
}
