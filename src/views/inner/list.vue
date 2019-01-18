<template>
  <div class="app-container">

  </div>
</template>

<script>
import common from '@/utils/common'
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'

export default {
  name: '',
  directives: {
    waves
  },
  data() {
    return {

    }

  },
  filters: {

  },
  created() {

  },
  methods: {
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
