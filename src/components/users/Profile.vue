<!-- Display a user's profile common data -->
<template>
  <div class="user-details me-2">
    <div class="d-flex linear-gradient-ocean align-items-center rounded shadow">
      <img
        :src="data.profile.avatar_url"
        loading="lazy"
        :alt="`${data.profile.login}'s profile image`"
        :title="`${data.profile.login}'s profile image`"
        v-b-tooltip.hover
        class="img-fluid user-profile img-round m-2"
      />
      <div class="text-light">
        <h2>
          {{ data.profile.name }}
        </h2>
        <small class="fst-italic">
          <font-awesome-icon
            :icon="['fas', 'user-tag']"
            fixed-width
          />
          {{ data.profile.login }}
        </small>
        <small class="mx-2">
          <font-awesome-icon
            :icon="['fas', 'user-tag']"
            fixed-width
          />
          {{ data.profile.location }}
        </small>
        <small
          class="mx-2"
          title="Followers"
        >
          <font-awesome-icon
            :icon="['fas', 'user-tag']"
            fixed-width
          />
          {{ data.profile.followers }}
        </small>
        <small
          title="Following"
        >
          <font-awesome-icon
            :icon="['fas', 'user-tag']"
            fixed-width
          />
          {{ data.profile.following }}
        </small>
      </div>
    </div>
    <!-- User list short details -->
    <div class="mt-3">
      <!-- List detailed profile data only when viewing the profile -->
      <div v-if="data.repos.length">
        <h4 class="my-3">
          <font-awesome-icon
            :icon="['fas', 'code-branch']"
            fixed-width
          />
          Most forked repositories
        </h4>
        <repo-details
          :data="mostForkedRepos"
          type="most-forked"
        />
        <h4 class="mt-4 mb-3">
          <font-awesome-icon
            :icon="['fas', 'eye']"
            fixed-width
          />
          Most watched repositories
        </h4>
        <repo-details
          :data="mostWatchedRepos"
          type="most-watched"
        />
      </div>
      <div v-else>
        This user has no repositories.
      </div>
    </div>
  </div>
</template>

<script>
import RepoDetails from '@/components/users/Repo'
export default {
  name: 'UserProfile',
  components: {
    RepoDetails
  },
  props: {
    data: {
      type: [Object, null],
      required: true
    },
    detailed: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      userRepos: []
    }
  },
  computed: {
    mostForkedRepos () {
      // Avoid side-effects in computed properties
      const tmp = JSON.parse(JSON.stringify(this.data.repos))
      return tmp.sort((a, b) => b.forks - a.forks).splice(0, 5)
    },
    mostWatchedRepos () {
      // Avoid side-effects in computed properties
      const tmp = JSON.parse(JSON.stringify(this.data.repos))
      return tmp.sort((a, b) => b.watchers - a.watchers).splice(0, 5)
    }
  },
  mounted () {
    // Avoid mutating props directly
    if (this.data && 'repos' in this.data) {
      this.userRepos = this.data.repos
    }
  }
}
</script>
<style
  lang="less"
  scoped
>
  .linear-gradient-ocean {
    background: rgb(16,11,112);
    background: linear-gradient(45deg, rgba(16,11,112,1) 0%, rgba(27,61,129,1) 50%, rgba(0,212,255,1) 100%);
  }
  .user-profile {
    max-width: 200px;
    overflow: hidden;
  }
  .img-round {
    border-radius: 50%;
  }
</style>
