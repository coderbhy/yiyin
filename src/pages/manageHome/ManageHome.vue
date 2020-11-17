<template>
  <div class="manage-home q-pa-md">
    <!-- row-key 绑定的是 name 值 -->
    <q-table
      title="已审核"
      :data="data"
      :columns="columns"
      row-key="video_id"
    >
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
      <!-- <template v-slot:body="props">
        <q-tr :props="props"> -->
          <!-- key 绑定的是 name 值 -->
          <!-- <q-td key="status" :props="props" class="text-center">
            <div class="text-center">
              {{ props.row.status }}
            </div> -->
            <!-- props 绑定的是 field 中的值 -->
           
          <!-- </q-td>
          <q-td key="yiban_uid" :props="props">
            <q-badge color="green">
              {{ props.row.yiban_uid }}
            </q-badge>
          </q-td>
          <q-td key="name" :props="props">
            <q-badge color="purple">
              {{ props.row.name }}
            </q-badge>
          </q-td>
          <q-td key="video_title" :props="props">
            <q-badge color="orange">
              {{ props.row.video_title }}
            </q-badge>
          </q-td>
          <q-td key="video_id" :props="props">
            <q-badge color="primary">
              {{ props.row.video_id }}
            </q-badge>
          </q-td>
          <q-td key="video_content" :props="props">
            <q-badge color="teal">
              {{ props.row.video_content }}
            </q-badge>
          </q-td>
          <q-td key="handle" :props="props">
            <q-badge color="accent">
              {{ props.row.handle }}
            </q-badge>
          </q-td>
        </q-tr>
      </template> -->
    </q-table>
  </div>
</template>

<script>
export default {
  methods: {
    log(value){
      console.log(value)
    }
  },
  data () {
    return {
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

<style scoped>
  
</style>