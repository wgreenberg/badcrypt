<script lang="ts">
    import { SymmetricKey } from "$lib/crypto";
    import ImageLoad from "$lib/ImageLoad.svelte";
    import { onMount } from "svelte";
    import CanvasImage from "$lib/CanvasImage.svelte";
    import ShareLink from "$lib/ShareLink.svelte";
    import Pokemon from "$lib/Pokemon.svelte";

    const height = 200;
    const width = 200;

    let image: HTMLImageElement | undefined = $state(undefined);
    let pokemonImage: HTMLImageElement | undefined = $state(undefined);
    let uploadedImage: HTMLImageElement | undefined = $state(undefined);
    let base64ImageData: string | undefined = $state(undefined);

    $effect(() => {
        if (pokemonImage) {
            image = pokemonImage;
        }
    })

    $effect(() => {
        if (uploadedImage) {
            image = uploadedImage;
        }
    })
</script>

<main>
<div>
    <div class="image">
        <ImageLoad bind:image={uploadedImage} {height} {width} />
        <Pokemon bind:image={pokemonImage} />
        <CanvasImage {height} {width} {image} bind:base64ImageData={base64ImageData} />
    </div>
    <img src="/cat1.gif">
</div>
</main>

<style>
    .image {
        border: 1px dashed black;
    }
</style>
