<script lang="ts">
    import { RsaKeyPair, RsaPublicKey } from "$lib/crypto";
    import KeyPair from "$lib/KeyPair.svelte";
    import { onMount } from "svelte";
    import OperationChooser from "$lib/OperationChooser.svelte";
    import { Operation } from "$lib/operation";

    let keyPair: RsaKeyPair | undefined = $state(undefined);
    let operation = $state(Operation.None);
    let recipientKey: RsaPublicKey | undefined = $state(undefined);

    onMount(() => {
        let existingKeyPair = window.localStorage.getItem('rsaKeyPair');
        if (existingKeyPair) {
            keyPair = RsaKeyPair.fromString(existingKeyPair);
        } else {
            keyPair = RsaKeyPair.generate();
            window.localStorage.setItem('rsaKeyPair', keyPair.toString());
        }
    });
</script>

<h1>fuck</h1>
<OperationChooser bind:operation={operation} bind:recipientKey={recipientKey} />
<KeyPair {keyPair}/>
