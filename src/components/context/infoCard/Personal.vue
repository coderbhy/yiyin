<template>
  <div class="personal">
    <div class="top-img">
      <q-img
        src="~assets/img/profile/星空背景图.jpg"
        :ratio="16/9"
        width="100%"
        height="25vh"
      />
    </div>
    <div class="main">
      <div class="avatar relative-position row items-center text-center">
        <q-avatar size="5rem">
          <img :src="userInfo.yb_userhead" alt="头像">
        </q-avatar>
        <div class="col edit-info">
          <q-btn color="primary" label="编辑资料" text-color="white" padding="xs xl" @click="$router.push('/edit')"/>
        </div>
      </div>
    </div> 
    <div class="intro">
      <div class="nickname text-weight-bold">{{ userInfo.yb_usernick }}</div>
      <div class="yiban-uid q-mb-sm">易班id:{{ userInfo.yb_userid }}</div>
    </div>
    <q-separator inset/>
    <!-- <div class="great-data q-my-sm row">
      <div class="likes row q-pr-md">
        <span class="text-nowrap ellipses">{{ personInfo.like }}</span>
        <div class="">获赞</div>
      </div>
      <div class="concern row q-pr-md">
        <span class="text-no-wrap ellipsis">{{ personInfo.concern }}</span>
        <div class="">关注</div>
      </div>
      <div class="fans row">
        <span class="text-nowrap ellipses">{{ personInfo.fans }}</span>
        <div class="">粉丝</div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      'userInfo': state => state.user.userInfo
    })
  }
}
</script>

<style scoped>
.personal .main .avatar {
  z-index: 9;
  top: -.5rem;
  border-radius: 50%;
  margin-left: .5rem;
}
.personal .main .edit-info {
  padding-top: .5rem;
}
.personal .intro .nickname {
  font-size: 1.3rem;
  letter-spacing: .25rem;
  margin-left: .5rem;
}
.personal .intro .yiban-uid {
  font-size: .5rem;
  margin-left: .5rem;
}
.great-data {
  margin-left: .5rem;
}
.great-data .row > span {
  width: 2rem;
}
</style>