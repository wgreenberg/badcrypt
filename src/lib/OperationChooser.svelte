<script lang="ts">
    import { RsaKeyPair, RsaPublicKey } from "./crypto";
    import { Operation } from "./operation";

    let { operation = $bindable(), recipientKey = $bindable() }: {
        operation: Operation,
        recipientKey: RsaPublicKey | undefined,
    } = $props();

    function parsePublicKey(e: Event) {
        const keyString = (e.target! as any).value;
        recipientKey = RsaPublicKey.fromString(keyString);
    }
</script>

<div>
    <div>
        <label><input bind:group={operation} type="radio" value={Operation.Encrypt}>Encrypt</label>
        <label><input bind:group={operation} type="radio" value={Operation.Decrypt}>Decrypt</label>
    </div>
    {#if operation === Operation.Encrypt}
    <div>
        <p>Public key of recipient</p>
        <input type="text" oninput={parsePublicKey} />
    </div>
    {/if}
</div>
