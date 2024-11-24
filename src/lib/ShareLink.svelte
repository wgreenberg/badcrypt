<script lang="ts">
    let { base64ImageData }: { base64ImageData: string } = $props();

    let copyPromise: Promise<void> | null = $state(null);
    function copyShareLink() {
        window.location.hash = base64ImageData!;
        copyPromise = navigator.clipboard.writeText(window.location.toString());
    }
</script>

<div>
<button onclick={copyShareLink}>Copy share link</button>
{#if copyPromise}
    {#await copyPromise}
    <p>Copying...</p>
    {:then foo}
    <p>Copied!</p>
    {:catch err}
    <p>Copy failed: {err}</p>
    {/await}
{/if}
</div>
