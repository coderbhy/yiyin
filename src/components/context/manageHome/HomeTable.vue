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
      :dark="dark"
      hide-bottom
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
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
          dense
          options-dense>
          <template v-slot:prepend>
            <q-icon name="event" />
          </template>
        </q-select>
      </template>
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <div v-if="props.value === '0'">
            <q-icon name="icon-chenggong" color="positive" size="1.5rem"></q-icon>
          </div>
          <div v-else>
            <q-icon name="icon-shibai" color="negative" size="1.5rem"></q-icon>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-src="props">
        <q-td :props="props">
          <q-btn dense flat icon="movie" color="primary" @click="showVideoCard(true, props.value, props.row.title)"></q-btn>
        </q-td>
      </template>
      <template v-slot:body-cell-cover="props">
        <q-td :props="props">
          <div>
            <!-- {{ props.value }} -->
            <!-- <q-img :src="~assets/avatar/星空.jpg"/> -->
            <q-img :src="props.value" width="2.5rem">
              <template v-slot:error>
                <div class="absolute-full flex flex-center bg-negative text-white">
                  Cannot load image
                </div>
              </template>
            </q-img>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-handle="props">
        <q-td :props="props">
          <div>
            <q-btn :disable="props.row.status === '0'" icon="check" flat rounded class="text-positive q-mr-sm" dense @click="pass(props.row.id)"></q-btn>
            <q-btn :disable="props.row.status === '1'" icon="close" flat rounded class="text-negative" dense @click="unpass(props.row.id)"></q-btn>
          </div>
        </q-td>
      </template>
    </q-table>
    
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    // 类型选择数组
    typeArray: {
      type: Array,
      default () {
        return []
      }
    },
    // data
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    ...mapState({
      'checkModuleDark': state => state.manager.checkModuleDark
    }),
    dark () {
      if (this.$q.localStorage.has('checkModuleDark')) {
        return this.$q.localStorage.getItem('checkModuleDark')
      } else {
        console.log(this.checkModuleDark)
        return this.checkModuleDark
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
    // 向父组件发送请求，显示 dialog
    showVideoCard (bool, src, title) {
      // console.log(bool)
      // console.log(src)
      this.$emit('showVideoCard', { bool, src, title })
    },
    // 通过审核
    pass (id) {
      // console.log(id)
      this.$q.dialog({
        // title: 'Options',
        message: `确定通过视频id为${id}的视频吗？`,
        cancel: true
      }).onOk(() => {
        // console.log('>>>> OK, received', data)
        this.$emit('passTheId', id)
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      })
    },
    unpass (id) {
      this.$q.dialog({
        // title: 'Options',
        message: `确定不通过视频id为${id}的视频吗？`,
        cancel: true
      }).onOk(() => {
        // console.log('>>>> OK, received', data)
        this.$emit('unpassTheId', id)
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      })
    }
  },

  data () {
    return {  
      model: null,
      loading: false,
      pagination: {
        // 根据 data 的某个字段进行排序
        // sortBy: 'id',
        // 是否按降序排列
        descending: false,
        // 页码
        page: 1,
        // 每页有多少行
        // 设置每页有 14 行
        rowsPerPage: 14
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
          name: 'id',
          required: true,
          label: '视频id',
          align: 'left',
          field: row => row.id,
          sortable: false
        },
        {
          name: 'title',
          required: true,
          label: '视频标题',
          align: 'left',
          field: row => row.title,
          sortable: true
        },
        {
          name: 'src',
          required: true,
          label: '视频内容',
          align: 'center',
          field: row => row.src
        },
        
        {
          name: 'cover',
          required: true,
          label: '视频封面',
          align: 'center',
          field: row => row.cover
        },
        {
          name: 'v_type',
          required: true,
          label: '视频类型',
          align: 'left',
          field: row => row.v_type,
          sortable: true
        },
        {
          name: 'upload_date',
          required: true,
          label: '视频上传日期',
          align: 'left',
          field: row => row.upload_date,
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
    }
  }
}
</script>

<style lang="sass">
.my-sticky-header-table-home
  /* height or max-height is important */
  height: 82vh

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