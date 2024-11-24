<script lang="ts">
  import { onMount, tick } from "svelte";
  import Secret from "$lib/Secret.svelte";
    import type { RsaKeyPair, RsaPublicKey, SymmetricKey } from "./crypto";
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
  let secret: SymmetricKey | undefined = $state(undefined);

  onMount(() => {
      ctx = canvas.getContext("2d")!;
  })

  $effect(() => {
        if (image && ctx) {
            console.log('image changed, drawing', image.src)
            // ctx.clearRect(0, 0, width, height);
            ctx.drawImage(image, 0, 0, width, height);
            base64ImageData = canvas.toDataURL('image/jpeg');
            console.log('drawn')
        }
  });

  function applySecret() {
      if (!ctx || !secret) return;

      const imageData = ctx.getImageData(0, 0, width, height);
      secret.apply(imageData.data);
      ctx.putImageData(imageData, 0, 0);
      base64ImageData = canvas.toDataURL('image/jpeg');
  }
</script>

<div>
<canvas
    bind:this={canvas}
    height=200
    width=200
>
</canvas>
<Secret bind:secret={secret} />
<button onclick={applySecret}>Encrypt/Decrypt</button>
</div>
