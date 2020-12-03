import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
// 从接口获取到类型数组
export function getTypesFromInterface (context, paylaod) {
  let formData = new FormData()
  formData.append('other', '')
  axios({
    method: 'post',
    url: '/admin/showtype',
    data: formData
  })
    .then(res => {
      if (res.data.code === 200) {
        context.commit('detectAndModifi', res.data.data)
      }
    })
}
// 删除类型
// payload => { v_type }
export function delTypeFromCpt (context, payload) {
  let formData = new FormData()
  formData.append('v_type', payload)
  return axios({
    method: 'post',
    data: formData,
    url: '/admin/deltype'
  })
}
// 更新类型
// payload => { v_type: String, type_status: Boolean }
export function UpdateTypefromCpt (context, payload) {
  let formData = new FormData()
  formData.append('v_type', payload.v_type)
  formData.append('type_status', payload.type_status)
  return axios({
    method: 'post',
    data: formData,
    url: '/admin/updatetype'
  })
}
// 添加类型
// payload => formData
export function addTypefromCpt (context, payload) {
  return axios({
    method: 'post',
    data: payload,
    url: '/admin/addtype'
  })
} 