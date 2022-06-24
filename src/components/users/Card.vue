<!-- Display a user's profile common data -->
<template>
  <div>
    <router-link
      :to="{
        name: 'Users',
        params: {
          username: user.login
        }
      }"
    >
      <img
        :src="user.avatar_url"
        loading="lazy"
        :alt="`${user.login}'s profile image`"
        :title="`${user.login}'s profile image`"
        v-b-tooltip.hover
        class="img-fluid user-profile img-round me-2 mb-3"
      />
      <h6>
        {{ user.login }}
      </h6>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'UserCard',
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>
<style
  lang="less"
  scoped
>
  .user-profile {
    max-width: 120px;
    overflow: hidden;
  }
  .img-round {
    border-radius: 50%;
  }
</style>
