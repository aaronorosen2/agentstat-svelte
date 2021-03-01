<script>
  import { chart } from 'svelte-apexcharts/src/index';
  import { chartOptions } from './chart-options';
  export let small = false;
  export let props = {};

  $: options = chartOptions({ ...props, small });
</script>

<div use:chart={options} />