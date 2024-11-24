<script lang="ts">
    import { onMount } from "svelte";
    import { RsaKeyPair } from "./crypto";

    let { keyPair }: { keyPair: RsaKeyPair | undefined } = $props();

    function copyPub() {
        if (keyPair) {
            navigator.clipboard.writeText(JSON.stringify(keyPair!.publicKey));
        }
    }
</script>

<div>
    <div class="publickey">
        <p>My public key</p>
        <input type="text" value={keyPair ? JSON.stringify(keyPair.publicKey) : 'loading...'}/>
        <button onclick={copyPub}>Copy Public Key</button>
    </div>
    <div class="privatekey">
        <p>My private key</p>
        <input type="text" value={keyPair ? keyPair.privateKey : 'loading...'}/>
    </div>
</div>
