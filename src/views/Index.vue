<template>
  <div class="home">
    <Loading
      v-if="loading"
    />
    <div
      v-else
      class="d-flex justify-content-between flex-wrap"
    >
      <div
        v-for="(user, userIndex) in users"
        :key="`item-${userIndex}`"
        class="col-12 col-md-4 col-lg-3 mb-3 user-details text-center me-2 p-3 shadow"
      >
        <user-card
          :user="user"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/core/Api'
import Loading from '@/components/common/Loading'
import UserCard from '@/components/users/Card'
export default {
  name: 'Index',
  components: {
    Loading,
    UserCard
  },
  data () {
    return {
      loading: false,
      users: []
    }
  },
  async mounted () {
    try {
      this.loading = false
      if (localStorage['github-users']) {
        // Cache entry so we don't have to use more bandwidth than necessary
        this.users = JSON.parse(localStorage['github-users'])
      } else {
        const res = await Api.users.getAll()
        if (res.status === 200) {
          // Handle result data
          this.users = res.data
          localStorage['github-users'] = JSON.stringify(this.users)
        } else {
          throw new Error({
            status: res.status,
            statusText: res.statusText
          })
        }
      }
    } catch (error) {
      // TODO: Add emit handling or logs. Yeah, not doing that now.
      console.error(error)
    } finally {
      this.loading = false
    }
  }
}
</script>
