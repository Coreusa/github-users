<template>
  <div class="home">
    {{ username }}
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
  computed: {
    username () {
      return this.$route.params.username
    }
  }
}
</script>
