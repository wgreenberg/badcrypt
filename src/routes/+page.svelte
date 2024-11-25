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
<div class="window" style="width: 610px">
    <div class="title-bar">
        <div class="title-bar-text">
            Symmetric image encryption
        </div>
    </div>
    <div class="window-body">
        <fieldset>
        <ImageLoad bind:image={uploadedImage} {height} {width} />
        <br>
        <Pokemon bind:image={pokemonImage} />
        </fieldset>
        <CanvasImage {height} {width} {image} bind:base64ImageData={base64ImageData} />
    </div>
<div class="status-bar">
    <div class="status-bar-field">
    <img src="cat1.gif">
    </div>
</div>
</div>
</main>

<style>
    :global(label), :global(input[type="text"]), :global(input[type="password"]) {
        font-size: 14px;
    }
</style>
