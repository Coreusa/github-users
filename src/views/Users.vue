<template>
  <b-row
    class="col-12 mx-auto"
  >
    <Loading
      v-if="loading"
    />
    <user-profile
      v-else
      :data="user"
      :detailed="true"
    />
  </b-row>
</template>

<script>
import Api from '@/core/Api'
import Loading from '@/components/common/Loading'
import UserProfile from '@/components/users/Profile'
export default {
  name: 'Profile',
  components: {
    Loading,
    UserProfile
  },
  data () {
    return {
      loading: false,
      user: {
        profile: [],
        repos: []
      }
    }
  },
  computed: {
    username () {
      return this.$route.params.username
    }
  },
  async mounted () {
    try {
      this.loading = true
      // Cache entry so we don't have to use more bandwidth than necessary
      if (localStorage[`github-user-${this.username}`]) {
        this.user = JSON.parse(localStorage[`github-user-${this.username}`])
        console.dir('Using cached profile')
      } else {
        const userRes = await Api.users.get(this.username)
        const userReposRes = await Api.users.getRepos(this.username)
        if (userRes.status === 200 && userReposRes.status === 200) {
          // Handle result data
          this.user.profile = userRes.data
          this.user.repos = userReposRes.data
          localStorage[`github-user-${this.username}`] = JSON.stringify({
            profile: userRes.data,
            repos: userReposRes.data
          })
        } else {
          throw new Error({
            status: userRes.status,
            statusText: userRes.statusText
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
