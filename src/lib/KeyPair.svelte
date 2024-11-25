<script lang="ts">
    import { onMount } from "svelte";
    import { RsaKeyPair } from "./crypto";

    let { keyPair }: { keyPair: RsaKeyPair | undefined } = $props();
    let showPrivateKey = $state(false);
    let privateKeyInputType = $derived(showPrivateKey ? "text" : "password");

    function copyPub() {
        if (keyPair) {
            navigator.clipboard.writeText(JSON.stringify(keyPair!.publicKey));
        }
    }
</script>

<div>
    <div class="publickey">
        <p>My public key</p>
        <fieldset role="group">
        <input type="text" value={keyPair ? JSON.stringify(keyPair.publicKey) : 'loading...'}/>
        <input type="submit" onclick={copyPub} value="Copy Public Key"/>
        </fieldset>
    </div>
    <div class="privatekey">
        <p>My private key</p>
        <input type={privateKeyInputType} value={keyPair ? keyPair.privateKey : 'loading...'}/>
        <label for="showPrivateKey"><input type="checkbox" name="showPrivateKey" bind:checked={showPrivateKey} />Show Private Key</label>
    </div>
</div>
