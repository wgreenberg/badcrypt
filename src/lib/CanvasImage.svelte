<script lang="ts">
  import { onMount, tick } from "svelte";
  import Secret from "$lib/Secret.svelte";
    import { SymmetricKey, type RsaKeyPair, type RsaPublicKey } from "./crypto";
    import { Operation } from "./operation";
    import { walk } from "svelte/compiler";

  let { base64ImageData = $bindable(), image, height, width }: {
      base64ImageData: string | undefined,
      image: HTMLImageElement | undefined,
      height: number,
      width: number,
  } = $props();

  let canvas: HTMLCanvasElement;
  let ctx : CanvasRenderingContext2D | undefined = undefined;
  let secretStr: string | undefined = $state(undefined);
  let downloadReady = $state(false);

  onMount(() => {
      ctx = canvas.getContext("2d")!;
  })

  $effect(() => {
        if (image && ctx) {
            console.log('image changed, drawing', image.src)
            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(image, 0, 0, width, height);
            base64ImageData = canvas.toDataURL();
            console.log('drawn')
        }
  });

  let secret = $derived(secretStr ? new SymmetricKey(secretStr) : undefined);

  function applySecret() {
      if (!ctx || !secret) return;

      const imageData = ctx.getImageData(0, 0, width, height);
      secret.apply(imageData.data);
      ctx.putImageData(imageData, 0, 0);
      base64ImageData = canvas.toDataURL();
      downloadReady = true;
  }

  function download() {
      if (base64ImageData) {
          const link = document.createElement('a');
          link.href = base64ImageData;
          link.download = 'secret.png';
          link.click();
          link.remove();
      }

  }
</script>

<div>
    <canvas
        bind:this={canvas}
        {width}
        {height}
    >
    </canvas>
    {#if base64ImageData}
    <div class="secretbox">
        <fieldset role="group">
            <input type="text" bind:value={secretStr} />
            <input type="submit" onclick={applySecret} value="Encrypt/Decrypt" />
        </fieldset>
    </div>
    {#if downloadReady}
    <a href="#" onclick={download}><img src="download.gif"></a>
    {/if}
    {/if}
</div>

<style>
canvas {
    width: 300px;
    height: 300px;
}
</style>
