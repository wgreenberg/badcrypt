<script lang="ts">
    import { getRandomInt } from "./crypto";

    let { image = $bindable() }: {
        image: HTMLImageElement | undefined,
    } = $props();

    let pokedexIndex: number | undefined = $state(undefined);

    function randomize() {
        pokedexIndex = getRandomInt(1, 720);
    }

    $effect(() => {
        if (pokedexIndex !== undefined) {
            let img = new Image();
            img.src = `/pokemon/${pokedexIndex}.png`;
            img.onload = () => {
                image = img;
            }
        }
    })
</script>

<div>
    <input type="number" max="720" bind:value={pokedexIndex} />
    <button onclick={randomize}>I'm Feeling Lucky</button>
</div>
