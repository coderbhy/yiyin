<template>
  <div class="home-table">
    <!-- row-key 绑定的是 name 值 -->
    <q-table
      title="已审核"
      class="my-sticky-header-table-home"
      :data="data"
      :columns="columns"
      row-key="video_id"
      :filter="filter"
      no-data-label="I didn't find anything for you"
      :pagination.sync="pagination"
      :loading="loading"
      @request="onRequest"
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn icon="add" round size="sm" flat class="bg-primary text-white q-ml-sm" dense></q-btn>
        <q-select
          transition-show="scale"
          transition-hide="scale"
          outlined
          v-model="model"
          :options="typeArray"
          options-value="v_type"
          option-label="v_type"
          class="q-ml-sm select"
          clearable
          label="选择类型"
          @input="changeModel"
          dense
          options-dense>
          <template v-slot:prepend>
            <q-icon name="event" />
          </template>
        </q-select>
      </template>
      <template v-slot:body-cell-name="props">
        <q-td :props="props">
          <div>
            <q-badge color="purple" :label="props.value" />
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <div v-if="props.value">
            <q-icon name="icon-chenggong" color="positive" size="1.5rem"></q-icon>
          </div>
          <div v-else>
            <q-icon name="icon-shibai" color="negative" size="1.5rem"></q-icon>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-video_title="props">
        <q-td :props="props">
          <div>
            <q-badge color="purple" :label="props.value" />
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-handle="props">
        <q-td :props="props">
          <div>
            <q-btn icon="check" flat rounded class="text-positive q-mr-sm" dense></q-btn>
            <q-btn icon="close" flat rounded class="text-negative" dense></q-btn>
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  props: {
    typeArray: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    changeModel (value) {
      // value => { v_type: String, type_status: String }
      this.$emit('getTypeData', {
        'obj': value,
        'status': true
      })
    },
    onRequest (props) {
      // props => { pagination: this.pagination, filter: this.filter  }
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const filter = props.filter
      this.loading = true
      setTimeout(() => {
        // update rowsCount with appropriate value
        this.pagination.rowsNumber = this.getRowsNumberCount(filter)
        // 若选择了 all，则获取所有行
        // 0 意味着无穷大
        // 如果选择了 0，则显示所有从服务器获取到的数据
        // 否则选择 3，每页就显示 3 条数据，选择 5，每页就显示 5 条数据
        // fetchCount => 每页显示数据条数
        const fetchCount = rowsPerPage === 0 ? this.pagination.rowsNumber : rowsPerPage
        // 计算起始行数据
        const startRow = (page - 1) * rowsPerPage
        // 从服务器获取数据
        //  fetchCount => 每页显示数据条数
        // filter => String
        const returnedData = this.fetchFromServer(startRow, fetchCount, filter, sortBy, descending)

        // clear out existing data and add new
        this.data.splice(0, this.data.length, ...returnedData)

        // don't forget to update local pagination object
        this.pagination.page = page
        this.pagination.rowsPerPage = rowsPerPage
        this.pagination.sortBy = sortBy
        this.pagination.descending = descending

        // ...and turn of loading indicator
        this.loading = false
      }, 1500)
    },
    fetchFromServer (startRow, count, filter, sortBy, descending) {
      const data = filter
        ? this.data.filter(row => row.name.includes(filter))
        : this.data.slice()

      // handle sortBy
      // 如果有排序
      if (sortBy) {
        const sortFn = sortBy === 'desc'
        // 如果是按照 desc 字段的值进行排序
          ? (descending
            // 正序
            ? (a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0)
            // 逆序
            : (a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
          )
          // 按照用户自定义的值进行排序
          : (descending
            ? (a, b) => (parseFloat(b[sortBy]) - parseFloat(a[sortBy]))
            : (a, b) => (parseFloat(a[sortBy]) - parseFloat(b[sortBy]))
          )
        data.sort(sortFn)
      }

      return data.slice(startRow, startRow + count)
    },
    // 返回长度 =>  查找与输入字段有关联的长度
    getRowsNumberCount (filter) {
      if (!filter) {
        // 如果未输入查找字段，则返回所有数据
        return this.data.length
      }
      let count = 0
      this.data.forEach((treat) => {
        if (treat.name.includes(filter)) {
          ++count
        }
      })
      return count
    }
  },
  mounted () {
    this.onRequest({
      pagination: this.pagination,
      // filter 绑定的 this.filter
      filter: undefined
    })
  },
  data () {
    return {  
      model: null,
      loading: false,
      pagination: {
        // 根据 data 的某个字段进行排序
        sortBy: 'id',
        // 是否按降序排列
        descending: false,
        // 页码
        page: 1,
        // 每页有多少行
        rowsPerPage: 7,
        // 总共有多少数据库行要添加到表中
        rowsNumber: 7
      },
      filter: '',
      selected: [],
      columns: [
        {
          name: 'status',
          required: true,
          label: '审核状态',
          align: 'center',
          field: row => row.status
          // sortable: true
        },
        {
          name: 'yiban_uid',
          required: true,
          label: 'yiban_uid',
          align: 'left',
          field: row => row.yiban_uid,
          sortable: false
        },
        {
          name: 'name',
          required: true,
          label: '姓名',
          align: 'left',
          field: row => row.name,
          sortable: true
        },
        {
          name: 'video_title',
          required: true,
          label: '视频名称',
          align: 'left',
          field: row => row.video_title,
          sortable: true
        },
        {
          name: 'video_id',
          required: true,
          label: '视频id',
          align: 'left',
          field: row => row.video_id,
          sortable: true
        },
        {
          name: 'video_content',
          required: true,
          label: '视频内容',
          align: 'left',
          field: row => row.video_content,
          sortable: true
        },
        {
          name: 'handle',
          required: true,
          label: '操作',
          align: 'center',
          field: row => row.handle,
        }
      ],
      data: [
        {
          status: 1,
          yiban_uid: 'qwe11211212r',
          name: '小明',
          video_title: '标题',
          video_id: '1234qwer',
          video_content: '内容',
          handle: '操作'
        },
        {
          status: 1,
          yiban_uid: 'qwer',
          name: '阿肖',
          video_title: '标题',
          video_id: '1234wer',
          video_content: '内容',
          handle: '操作'
        },
        {
          status: 0,
          yiban_uid: 'qwer',
          name: '包子',
          video_title: '标题',
          video_id: '1234qr',
          video_content: '内容',
          handle: '操作'
        }
      ]
    }
  }
}
</script>

<style lang="sass">
.my-sticky-header-table-home
  /* height or max-height is important */
  height: 87vh

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