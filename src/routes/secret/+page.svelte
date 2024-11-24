<script lang="ts">
    import { RsaKeyPair, RsaPublicKey } from "$lib/crypto";
    import KeyPair from "$lib/KeyPair.svelte";
    import { onMount } from "svelte";
    import OperationChooser from "$lib/OperationChooser.svelte";
    import { Operation } from "$lib/operation";

    let keyPair: RsaKeyPair | undefined = $state(undefined);
    let operation = $state(Operation.None);
    let recipientKey: RsaPublicKey | undefined = $state(undefined);
    let result: string | undefined = $state(undefined);
    let input = $state('');

    onMount(() => {
        let existingKeyPair = window.localStorage.getItem('rsaKeyPair');
        if (existingKeyPair) {
            keyPair = RsaKeyPair.fromString(existingKeyPair);
        } else {
            reroll();
        }
    });

    function go() {
        if (operation === Operation.Encrypt && recipientKey) {
            result = recipientKey.encryptString(input);
        } else if (operation === Operation.Decrypt) {
            result = keyPair!.decryptString(input);
        } else {
            result = undefined;
        }
    }

    function reroll() {
        keyPair = RsaKeyPair.generate();
        window.localStorage.setItem('rsaKeyPair', keyPair.toString());
    }
</script>

<div>
<h1>Share a secret!!!</h1>
<OperationChooser bind:operation={operation} bind:recipientKey={recipientKey} />
<div>
    <p>Secret:</p>
    <input type="text" maxlength={operation === Operation.Encrypt ? 4 : undefined} bind:value={input} />
    <button onclick={go}>GO</button>
    {#if result}
        <span><b>Result: </b> {result}</span>
    {/if}
</div>
<KeyPair {keyPair}/>
<button onclick={reroll}>Reroll</button>
</div>
