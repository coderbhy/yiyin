<template>
  <div>
    <q-table
      title="待审核"
      :data="data"
      :columns="columns"
      row-key="id"
      hide-pagination
      :filter="filter"
      no-data-label="I didn't find anything for you"
      class="my-sticky-header-table-home"
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <div>
            <q-icon name="icon-shalou" color="primary" size="1.5rem"></q-icon>
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
            <q-btn icon="check" flat rounded class="text-positive q-mr-sm" dense @click="pass(props.row.id)"></q-btn>
            <q-btn icon="close" flat rounded class="text-negative" dense @click="unpass(props.row.id)"></q-btn>
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    ...mapState({
      'UncheckCurrent': state => state.manager.UncheckCurrent
    })
  },
  data () {
    return {
      filter: '',
      columns: [
        { name: 'status', required: true, label: '审核状态', align: 'center', field: row => row.status },
        { name: 'id', required: true, label: '视频id', align: 'left', field: row => row.id, sortable: false },
        { name: 'title', required: true, label: '视频标题', align: 'left', field: row => row.title, sortable: true },
        { name: 'src', required: true, label: '视频内容', align: 'center', field: row => row.src },
        { name: 'cover', required: true, label: '视频封面', align: 'center', field: row => row.cover },
        { name: 'v_type', required: true, label: '视频类型', align: 'left', field: row => row.v_type, sortable: true },
        { name: 'upload_date', required: true, label: '视频上传日期', align: 'left', field: row => row.upload_date, sortable: true },
        { name: 'handle', required: true, label: '操作', align: 'center', field: row => row.handle }
      ]
    }
  },
  methods: {
    ...mapActions({
      'updateStatus': 'manager/updateStatus',
      'getMaxLength': 'manager/getMaxLength',
      'getSomeVideo': 'manager/getSomeVideo'
    }),
    ...mapMutations({
      'getUncheckMax': 'manager/getUncheckMax',
      'fillUncheckData': 'manager/fillUncheckData'
    }),
    pass (id) {
      console.log(id)
      this.$q.dialog({
        // title: 'Options',
        message: `确定通过视频id为${id}的视频吗？`,
        cancel: true
      }).onOk(() => {
        // console.log('>>>> OK, received', data)
        const self = this
        this.updateStatus({
          status: '0',
          id: id
        })
          .then(res => {
            // 更新最大页数
            const that = self
            self.getMaxLength()
              .then(res =>{
                that.getUncheckMax(res.data.data["2"])
            })
            // 更新当前页数据
            self.getSomeVideo({
              status: '2',
              page: ((that.UncheckCurrent - 1) * 7).toString()
            })
              .then(res => {
                that.fillUncheckData(res.data.data)
              })
          })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      })
    },
    unpass (id) {
      console.log(id)
      this.$q.dialog({
        // title: 'Options',
        message: `确定不通过视频id为${id}的视频吗？`,
        cancel: true
      }).onOk(() => {
        // console.log('>>>> OK, received', data)
        const self = this
        this.updateStatus({
          status: '1',
          id: id
        })
          .then(res => {
            // 更新最大页数
            const that = self
            self.getMaxLength()
              .then(res =>{
                that.getUncheckMax(res.data.data["2"])
            })
            // 更新当前页数据
            self.getSomeVideo({
              status: '2',
              page: ((that.UncheckCurrent - 1) * 7).toString()
            })
              .then(res => {
                that.fillUncheckData(res.data.data)
              })
          })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      })
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