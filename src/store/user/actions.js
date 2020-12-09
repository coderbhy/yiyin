import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/'
// 上传视频
export function UploadVideo (content, payload) {
  // console.log(payload)
  let formData = new FormData()
  formData.append('title', payload.title)
  formData.append('v_type', payload.type)
  formData.append('cover', payload.image)
  formData.append('video', payload.video)
  // formData.forEach(value => console.log(value))
  return axios({
    method: 'post',
    data: formData,
    url: '/user/upload',
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(res => {
      return res
    })
    .catch(err => {
      console.log(err)
    })
}
// 登录
export function Login (content, payload) {
  let formData = new FormData()
  formData.append('Username', payload.Username)
  formData.append('Password', payload.Password)
  return axios({
    method: 'post',
    data: formData,
    url: '/user/login',
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
// 点赞
export function thumb (content, payload) {
  console.log(payload)
  payload = payload.toString()
  let formData = new FormData()
  formData.append('id', payload)
  return axios({
    method: 'post',
    data: formData,
    url: '/user/thumb',
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
// 获取所有视频类型数组
export function getAllTypes (content) {
  let formData = new FormData()
  axios({
    method: 'post',
    data: formData,
    url: '/user/showtype',
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(res => {
      content.commit('updateTypeArr', res.data.data)
    })
    .catch(err => {
      console.log(err)
    })
}
// 根据类型获取一个视频
// payload => { type: String }
export function getOneVideo (context, payload) {
  let formData = new FormData()
  formData.append('v_type', payload.type)
  return axios({
    method: 'post',
    url: '/user/one',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
// 获取用户信息（头像、昵称等）
export function userSelfInfo (content) {
  let formData = new FormData()
  formData.append('page', '0')
  axios({
    method: 'post',
    url: '/user/self/info',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(res => {
      if (res.data.code === 200) {
        // res.data.data.info 是一个数组
        content.commit('updateUserInfo', res.data.data.info)
      }
    })
}
// 根据传进来的视频 id 获得点赞视频 src 等信息
export function getThumbVideo (content, payload) {
  let formData = new FormData()
  formData.append('id', payload)
  return axios({
    method: 'post',
    url: '/user/v_id',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
// *****************
// profile
// 根据 id 查找相应的视频详细信息
// payload => { id: String }
// 返回一个 promise 对象
export function getPerfectWorks (context, payload) {
  let formData = new FormData()
  formData.append('id', payload.id)
  return axios({
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: '/user/v_id'
  })
}
// 根据页数获取点赞的视频
export function userSelfThumb (context, payload) {
  let formData = new FormData()
  formData.append('page', payload.toString())
  return axios({
    method: 'post',
    url: '/user/self/thumb',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
// 根据页数获取自己的作品初始集合
// payload => { page: Number }
// page 限制 0 8 16 ...
export function getInitWorks (context, payload) {
  let formData = new FormData()
  formData.append('page', payload.page.toString())
  return axios({
    method: 'post',
    url: '/user/self/own',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  })
}
// ******************

// 传 id，返回视频点赞状态
