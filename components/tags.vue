<template>

    <div>
        <!-- https://vuetifyjs.com/en/components/chips/#filter -->
        <v-chip :input-value="activateFilter" filter filter-icon="mdi-star" v-for="tag in tags" :key="tag">{{tag}}</v-chip>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                tags: this.values,
            }
        },
        props: {
            values: [],
            activateFilter: true,
        },
    }

</script>
