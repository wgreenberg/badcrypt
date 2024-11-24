<script lang="ts">
    import { SymmetricKey } from "$lib/crypto";
    import ImageLoad from "$lib/ImageLoad.svelte";
    import { onMount } from "svelte";
    import CanvasImage from "$lib/CanvasImage.svelte";
    import ShareLink from "$lib/ShareLink.svelte";
    import Secret from "$lib/Secret.svelte";

    const height = 200;
    const width = 200;

    let secret: SymmetricKey | undefined = $state(undefined);
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

<h1>fuck</h1>
<ImageLoad bind:image={image} {height} {width} />
<CanvasImage {height} {width} {image} bind:base64ImageData={base64ImageData} {secret} />
<Secret bind:secret={secret} />
{#if base64ImageData }
    <ShareLink {base64ImageData} />
{/if}
