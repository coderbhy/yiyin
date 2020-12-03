<template>
  <q-layout view="hHh lpR lFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="absolute-center">
          易音后台
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="left"
      show-if-above
      :width="250"
      :breakpoint="700"
      elevated
      content-class="bg-primary text-white"
    >
      <q-scroll-area class="fit">
        <q-list dark separator bordered>
          <q-item-label header>导航栏</q-item-label>
          <q-item
            :to="item.to"
            exact
            v-for="item in iconList"
            :key="item.icon"
            class="text-grey-6">
            <q-item-section avatar>
              <q-icon :name="item.icon"/>
            </q-item-section>
            <q-item-section >
              {{ item.des }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      left: false,
      iconList: [
        {
          icon: 'icon-shenhe',
          des: '已审核',
          to: '/manage/home'
        },
        {
          icon: 'icon-daishen',
          des: '待审核',
          to: '/manage/other'
        },
        {
          icon: 'icon-zhuangtaitongji',
          des: '类型管理',
          to: '/manage/type'
        },
        {
          icon: 'icon-shezhi',
          des: '设置',
          to: '/manage/set'
        }
      ]
    }
  }
}
</script>

<style scoped>
.q-list .q-router-link--exact-active {
  color: white !important;
}
.q-toolbar__title {
  letter-spacing: .85rem;
}
</style>