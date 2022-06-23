<template>
  <b-list-group>
    <b-list-group-item
      v-for="(repo, repoIndex) in data"
      :key="`${type}-${repoIndex}`"
    >
      <h6>
        <a
          :href="repo.html_url"
          target="_blank"
        >
          {{ repo.full_name }}
        </a>
      </h6>
      <div
        class="d-flex align-items-center justify-content-between"
      >
        <p>
          Times forked: {{ repo.forks_count }}
        </p>
        <p>
          Watchers: {{ repo.watchers }}
        </p>
        <p>
          <b-badge
            :variant="repo.has_issues ? 'light' : 'success'"
          >
          {{ repo.has_issues ? 'Has issues' : 'Issue free!' }}
          <font-awesome-icon
            :icon="['fas', repo.has_issues ? 'exclamation-triangle' : 'check']"
          />
          </b-badge>
        </p>
      </div>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
export default {
  name: 'RepoDetails',
  props: {
    data: {
      type: Array,
      required: true,
      default: () => []
    },
    type: {
      type: String,
      required: true,
      default: 'repo'
    }
  },
  data () {
    return {
      repos: [],
      loading: false
    }
  },
  mounted () {
    // if (this.data && this.data.length) {
    //   this.loading = true
    //   // Props are read-only. Avoid the original reference as we're creating one sort for each component
    //   const tmp = JSON.parse(JSON.stringify(this.data))
    //   switch (this.type) {
    //     case 'most-forked':
    //       this.repos = tmp.sort((a, b) => b.forks_count - a.forks_count)
    //       break
    //     case 'most-watched':
    //       // this.repos = tmp.sort((a, b) => a.watchers - b.watchers)
    //       this.repos = tmp.sort((a, b) => b.watchers - a.watchers)
    //       break
    //     default:
    //       console.error('Invalid type provided')
    //   }
    // }
  }
}
</script>
