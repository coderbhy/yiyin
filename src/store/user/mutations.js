export function updateTypeArr (state, payload) {
  state.allTypes = []
  state.allTypes.concat(payload)
}

// 获取用户感兴趣的视频类型
export function getUserLikeType (state, payload) {
  state.userInfo.likeType = payload
}

export function updateUserInfo (state, payload) {
  state.userInfo.yb.userid = payload.yb_userid
  state.userInfo.yb_usernick = payload.yb_usernick
  state.yb_userhead = payload.yb_userhead
}
// 获取视频完整信息
// 并将信息放到 userThumb 数组中
export function updateThumb (state, payload) {
  for (let i = 0; i < state.userThumb.length; i++) {
    if (payload.id === state.userThumb[i].id) {
      Object.assign(state.userThumb[i], payload)
    }
  }
}
export function pushThumb (state, payload) {
  for (let i = 0; i < payload.length; i++) {
    state.userThumb.push(payload[i])
  }
}

export function pushWork (state, payload) {
  state.ownWorks.concat(payload)
}
// 完善单个作品信息
// payload => { obj: { id: '' , upload_date: '', cover: '', ... }, index: Number }
export function completeWork (state, payload) {
  Object.assign(state.ownWorks[payload.index], payload.obj)
}