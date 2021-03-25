<script>
    import TransactionTable from '../TransactionTable/TransactionTable.svelte'
    export let transaction = {}
</script>

{#if transaction.agent_lists}
    <TransactionTable editable list={transaction.agent_lists} />
{/if}
