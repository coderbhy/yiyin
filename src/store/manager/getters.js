export function VisibleTypes (state) {
  let visibleTypes = []
  for (let i = 0; i < state.allTypes.length; i++) {
    if (parseInt(state.allTypes[i].type_status)) {
      visibleTypes.push(state.allTypes[i])
    }
  }
  return visibleTypes
}
export function InvisibleTypes (state) {
  let invisibleTypes = []
  for (let i = 0; i < state.allTypes.length; i++) {
    if (!parseInt(state.allTypes[i].type_status)) {
      invisibleTypes.push(state.allTypes[i])
    }
  }
  return invisibleTypes
}