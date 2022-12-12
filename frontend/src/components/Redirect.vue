<template>
    <div class="container mx-auto px-72">
        <div class="warning text-center font-bold" style="margin-top: 50%;">
            WAIT . . . . .
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        mounted() {
            this.check()
        },
        data() {
            return {
                url: window.location.href,
            }
        },
        methods: {
            async check() {
                const redLink = await axios.get("http://localhost:3000/api/redirectLink", {
                    params: { url: this.url }
                })
                .then((response)=>{
                    window.location.replace(response.data)
                })
            }
        }
    }
</script>