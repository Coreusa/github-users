<template>
  <Menu />
  <b-container
    fluid
  >
    <b-row class="col-12 col-md-8 mx-auto">
      <router-view/>
    </b-row>
  </b-container>
</template>
<script>
import Menu from '@/components/common/Menu'
export default {
  name: 'GithubUsers',
  components: {
    Menu
  }
}
</script>
<style lang="less">
</style>
