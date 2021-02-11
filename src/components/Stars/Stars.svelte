<script>
    export let rating
    export let small = false
    function percent(r){
        return (parseFloat(rating)/5) * 100
    }
</script>
<span class="rating-star" class:small>
    <span class="fill" style="width: {percent(rating)}%" class:small />
</span>

<style src="./stars.scss"></style>