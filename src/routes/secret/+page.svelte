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
            navigator.clipboard.writeText(result);
        } else if (operation === Operation.Decrypt) {
            result = keyPair!.decryptString(input);
            navigator.clipboard.writeText(result);
        } else {
            result = undefined;
        }
    }

    function reroll() {
        keyPair = RsaKeyPair.generate();
        window.localStorage.setItem('rsaKeyPair', keyPair.toString());
    }
</script>

<main>
<div class="container">
<div class="opbox">
    <OperationChooser bind:operation={operation} bind:recipientKey={recipientKey} />
    {#if operation !== Operation.None}
    <div>
    <p>Secret:</p>
    <fieldset role="group">
    <input type="text" maxlength={operation === Operation.Encrypt ? 4 : undefined} bind:value={input} />
    <input type="submit" onclick={go} value="GO" />
    </fieldset>
    {#if result}
        <span><b>Copied result: </b> {result}</span>
    {/if}
    </div>
    {/if}
</div>
<div class="keyzone">
<KeyPair {keyPair}/>
<button onclick={reroll}>Reroll</button>
</div>
<img height=200 width=800 src="secretsafe.jpg" class={result ? "show" : "hide"}>
</div>
</main>

<style>
    :global(body) {
        background-image: url("keepyoursecrets.jpeg");
    }

    .container {
        padding: 10px;
        width: 500px;
    }

    .hide {
      opacity: 0;
      transition: opacity 1s linear;
      -webkit-transition: opacity 1s linear;
      -moz-transition: opacity 1s linear;
      -o-transition: opacity 1s linear;
    }
    .show {
      opacity: 1;
      transition: opacity 1s linear;
      -webkit-transition: opacity 1s linear;
      -moz-transition: opacity 1s linear;
      -o-transition: opacity 1s linear;
    }

    .keyzone {
        border: 1px dashed black;
    }
</style>
