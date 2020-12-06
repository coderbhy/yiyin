import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
// 从接口获取到类型数组
export function getTypesFromInterface (context) {
  let formData = new FormData()
  formData.append('arbitraty', '')
  return axios({
    method: 'post',
    url: '/admin/showtype',
    data: formData
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

// 从后台接口处获得已通过审核或者未通过审核，页数为page的数据
// payload => { status: '1', page: '0' }
export function getSomeVideo (context, payload) {
  let formData = new FormData()
  for (let i in payload) {
    formData.append(i, payload[i])
  }
  return axios({
    method: 'post',
    data: formData,
    url: '/admin/status_v'
  })
}

// 从后台接口处获得每种数据的数组长度
// 返回一个对象
// { '0': 14, '1': 15, '2': 13 }
export function getMaxLength (context, payload) {
  let formData = new FormData()
  formData.append('test', '')
  return axios({
    method: 'post',
    data: formData,
    url: ''
  })
}
// payload => { status: '', id: '' } 
export function updateStatus (context, payload) {
  let formData = new FormData()
  formData.append('status', payload.status)
  formData.append('id', payload.id)
  return axios({
    method: 'post',
    data: formData,
    url: '/admin/update_status'
  })
}