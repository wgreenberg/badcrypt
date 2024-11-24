<script lang="ts">
    import { RsaKeyPair, RsaPublicKey } from "./crypto";
    import { Operation } from "./operation";

    let { operation = $bindable(), recipientKey = $bindable() }: {
        operation: Operation,
        recipientKey: RsaPublicKey | undefined,
    } = $props();

    let unconfirmedOperation = $state(Operation.None);

    function parsePublicKey(e: Event) {
        const keyString = (e.target! as any).value;
        recipientKey = RsaPublicKey.fromString(keyString);
    }

    function confirmEncrypt() {
        operation = Operation.Encrypt;
    }

    function confirmDecrypt() {
        operation = Operation.Decrypt;
    }
</script>

<div>
    <div>
        <label><input bind:group={unconfirmedOperation} type="radio" value={Operation.Encrypt}>Encrypt</label>
        <label><input bind:group={unconfirmedOperation} type="radio" value={Operation.Decrypt}>Decrypt</label>
    </div>
    {#if unconfirmedOperation === Operation.Encrypt}
    <div>
        <p>Public key of recipient</p>
        <input type="text" oninput={parsePublicKey} />
        {#if recipientKey}
        <button onclick={confirmEncrypt}>Encrypt</button>
        {/if}
    </div>
    {/if}
    {#if unconfirmedOperation === Operation.Decrypt}
    <div><button onclick={confirmDecrypt}>Decrypt</button></div>
    {/if}
</div>
