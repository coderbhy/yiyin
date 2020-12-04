<template>
  <div class="type-card q-mb-md">
    <q-table
      :title="title"
      :data="dataArray"
      :columns="columns"
      row-key="v_type"
      flat
      bordered
      class="my-sticky-header-table"
      no-data-label="I didn't find anything for you"
      :filter="filter"
      :pagination="Pagination"
      hide-pagination
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn @click="add" icon="add" round size="sm" flat class="bg-primary text-white q-ml-sm" dense></q-btn>
      </template>
      <template v-slot:body-cell-type_status="props">
        <q-td :props="props">
          <!-- 利用 props.value 可以获取到本字段的值 -->
          <!-- 利用 props.row 可以获取到本行不同字段的值 -->
          <div v-if="parseInt(props.value)">
            <q-icon name="visibility" size="sm" color="positive"></q-icon>
          </div>
          <div v-else>
            <q-icon name="visibility_off" size="sm" color="negative"></q-icon>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-handle="props">
        <q-td :props="props">
          <q-btn
            icon="visibility"
            flat
            rounded
            class="text-positive q-mr-sm"
            dense
            :disable="parseInt(props.row.type_status) === 1"
            @click="toVisible(props.row.v_type)"></q-btn>
          <q-btn
            icon="visibility_off"
            flat
            rounded
            class="text-negative"
            dense
            :disable="parseInt(props.row.type_status) === 0"
            @click="toInvisible(props.row.v_type)"></q-btn>
          <q-btn
            icon="delete"
            flat
            rounded
            class="text-negative q-ml-xs"
            dense
            @click="delType(props.row.v_type)"></q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  props: {
    dataArray: {
      type: Array,
      default () {
        return []
      }
    },
    title: {
      type: String
    } 
  },
  data () {
    return {
      Pagination: {
        page: 1,
        // 设置每页展示页数为 All
        rowsPerPage: 0
      },
      filter: '',
      // name => 一列的标识符
      // field => 字段，如 field 为 row => field.xx 或者 field: xx
      // 则 data 中应该写 xx: '实际数据'
      columns: [
        { name: 'type_status', required: true, label: '状态', align: 'center', field: row => row.type_status },
        { name: 'v_type', required: true, label: '类型', align: 'center', field: row => row.v_type, format: val => `${val}`, sortable: true },
        { name: 'handle', label: '操作', field: row => row.handle, align: 'center' }
      ]
    }
  },
  methods: {
    toVisible (value) {
      this.$q.dialog({
        message: `确认显示${value}这个类型吗?`,
        cancel: true,
        position: 'top',
      })
        .onOk(() => {
          console.log(value)
          this.$emit('toVisible', value)
        })
    },
    toInvisible (value) {
      this.$q.dialog({
        message: `确认隐藏${value}这个类型吗?`,
        cancel: true,
        position: 'top',
      })
        .onOk(() => {
          console.log(value)
          this.$emit('toInvisible', value)
        })
    },
    delType (value) {
      this.$q.dialog({
        message: `确认删除${value}这个类型吗?`,
        cancel: true,
        position: 'top',
      })
        .onOk(() => {
          // console.log(value)
          this.$emit('delType', value)
        })
    },
    // 向父组件发送 addType 事件
    // 并使添加卡片的展示值为 true
    add () {
      this.$emit('addType', true)
    }
  }
}
</script>

<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 43vh

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #c1f4cd

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>