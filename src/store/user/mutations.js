export function updateTypeArr (state, payload) {
  state.allTypes = []
  state.allTypes.concat(payload)
}

// 获取用户感兴趣的视频类型
export function getUserLikeType (state, payload) {
  state.userInfo.likeType = payload
}
// payload 为一个数组
// payload => [
//  { yb_userid: '', yb_usernick: '', yb_userhead: '' }
// ]
export function updateUserInfo (state, payload) {
  state.userInfo.yb_userid = payload[0].yb_userid
  state.userInfo.yb_usernick = payload[0].yb_usernick
  state.yb_userhead = payload[0].yb_userhead
}
// 获取视频完整信息
// 并将信息放到 userThumb 数组中
export function updateThumb (state, payload) {
  for (let i = 0; i < state.userThumb.length; i++) {
    if (payload.id === state.userThumb[i].id) {
      Object.assign(state.userThumb[i], payload.content)
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

// 将从后端获取到的单个视频放入 state 中的 allVideos 中
export function pushOneVideoToAll (state, payload) {
  state.allVideos.push(payload)
}

export function updateOwn (state, payload) {
  for (let i = 0; i < state.ownWorks.length; i++) {
    if (payload.id === state.ownWorks[i].id) {
      Object.assign(state.ownWorks[i], payload.content)
    }
  }
}

export function test (state) {
  state.allVideos.push({
    user: {
      yb_userhead: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1610542142,718703573&fm=26&gp=0.jpg',
      yb_usernick: 'nickname'
    },
    video: {
      id: '4',
      num: '555',
      src: 'http://video.jishiyoo.com/161b9562c780479c95bbdec1a9fbebcc/8d63913b46634b069e13188b03073c09-d25c062412ee3c4a0758b1c48fc8c642-ld.mp4',
      title: '标题5',
      v_type: '军事'
    }
  })
}