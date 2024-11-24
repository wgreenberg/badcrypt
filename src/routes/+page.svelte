<script lang="ts">
    import { SymmetricKey } from "$lib/crypto";
    import ImageLoad from "$lib/ImageLoad.svelte";
    import { onMount } from "svelte";
    import CanvasImage from "$lib/CanvasImage.svelte";
    import ShareLink from "$lib/ShareLink.svelte";

    const height = 50;
    const width = 50;

    let image: HTMLImageElement | undefined = $state(undefined);
    let base64ImageData: string | undefined = $state(undefined);

    onMount(() => {
        if (window.location.hash !== '') {
            console.log('makin image')
            let img = new Image();
            img.src = window.location.hash.slice(1);
            image = img;
        }
    });
</script>

<div>
    <h1>fuck</h1>
    <div class="image">
        <ImageLoad bind:image={image} {height} {width} />
        <CanvasImage {height} {width} {image} bind:base64ImageData={base64ImageData} />
    </div>
    {#if base64ImageData }
        <ShareLink {base64ImageData} />
    {/if}
</div>

<style>
    .image {
        border: 1px dashed black;
    }
</style>
