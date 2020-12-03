// payload => [ { v_type: '', type_status: ''} ]
export function detectAndModifi (state, payload) {
  // 若 allTypes 长度为0
  // 则将第一次请求到的数据直接装入数组即可
  if (state.allTypes.length === 0) {
    state.allTypes.concat(payload)
  } else {
    for (let i = 0; i < payload.length; i++) {
      for (let j = 0; j < state.allTypes.length; j++) {
        if (state.allTypes[j].v_type === payload[i].v_type) {
          state.allTypes[j].type_status = payload[i].type_status
        }
      }
      if (!(state.allTypes.some(item => (item.v_type === payload[i].v_type)))) {
        state.allTypes.push(payload[i])
      }
    }
  }
}