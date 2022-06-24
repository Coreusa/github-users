<template>
<div>
  <h2>Search for users</h2>
  <b-input-group class="mt-3">
    <template #prepend>
      <b-input-group-text>
        <font-awesome-icon
          :icon="['fas', loading ? 'circle-notch' : 'magnifying-glass']"
          :spin="loading"
        />
      </b-input-group-text>
    </template>
    <input
      v-model.lazy="term"
      v-debounce="delay"
      :disabled="loading"
      :placeholder="`Search for something... (minimum ${minTermLength} characters)`"
      class="form-control"
    />
  </b-input-group>
  <b-alert
    :show="displayError"
    variant="info"
    class="my-3"
  >
    {{ errorMessage }}
  </b-alert>
  <Loading v-if="loading" />
  <div v-else>
    <h6
      v-if="'items' in users"
      class="my-3"
    >
      Total users: {{ users.total_count }}.
      {{ users.total_count > 30 ? 'Your search result yielded many results. Try being more specific' : '' }}
    </h6>
    <div class="d-flex justify-content-between flex-wrap">
      <div
        v-for="(user, userIndex) in users.items"
        :key="`item-${userIndex}`"
        class="col-12 col-md-4 col-lg-3 mb-3 user-details text-center me-2 p-3 shadow"
      >
        <user-card
          :user="user"
        />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Api from '@/core/Api'
import Loading from '@/components/common/Loading'
import UserCard from '@/components/users/Card'
import { directive } from 'v-debounce'
export default {
  name: 'Index',
  directives: {
    debounce: directive
  },
  components: {
    Loading,
    UserCard
  },
  data () {
    return {
      loading: false,
      delay: 500,
      users: [],
      term: '',
      minTermLength: 3,
      displayError: false,
      errorMessage: null
    }
  },
  computed: {
    username () {
      return this.$route.params.username
    }
  },
  watch: {
    term () {
      this.displayError = false
      this.errorMessage = null
      if (this.term.length >= this.minTermLength) {
        this.search(this.term)
      } else {
        this.displayError = true
        this.errorMessage = `Your search term is too short (minimum ${this.minTermLength})`
      }
    }
  },
  methods: {
    async search (term) {
      try {
        this.loading = true
        const res = await Api.users.search(term)
        if (res.status === 200) {
          // Handle result data
          this.users = res.data
        } else {
          throw new Error({
            status: res.status,
            statusText: res.statusText
          })
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
