<script lang="ts">
  import { onMount, tick } from "svelte";
    import type { RsaKeyPair, RsaPublicKey, SymmetricKey } from "./crypto";
    import { Operation } from "./operation";

  let { base64ImageData = $bindable(), image, height, width, secret }: {
      base64ImageData: string | undefined,
      image: HTMLImageElement | undefined,
      height: number,
      width: number,
      secret: SymmetricKey | undefined,
  } = $props();

  let canvas: HTMLCanvasElement;
  let ctx : CanvasRenderingContext2D | undefined = undefined;

  onMount(() => {
      ctx = canvas.getContext("2d")!;
  })

  $effect(() => {
        if (image && ctx) {
            console.log('image changed, drawing', image.src)
            // ctx.clearRect(0, 0, width, height);
            ctx.drawImage(image, 0, 0, width, height);
            base64ImageData = canvas.toDataURL();
            console.log('drawn')
        }
  });

  function applySecret() {
      if (!ctx || !secret) return;

      const imageData = ctx.getImageData(0, 0, width, height);
      secret.apply(imageData.data);
      ctx.putImageData(imageData, 0, 0);
      base64ImageData = canvas.toDataURL('jpg');
  }
</script>

<canvas
    bind:this={canvas}
    {height}
    {width}
>
</canvas>
<button onclick={applySecret}>Encrypt/Decrypt</button>
