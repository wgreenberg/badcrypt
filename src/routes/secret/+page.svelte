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
<div class="window" style="width: 320px">
    <div class="title-bar">
        <div class="title-bar-text">
            RSA-based secret sharing
        </div>
    </div>
<div class="window-body">
    <OperationChooser bind:operation={operation} bind:recipientKey={recipientKey} />
    {#if operation !== Operation.None}
    <div>
    <p>Secret:</p>
    <fieldset role="group">
    <input type="text" maxlength={operation === Operation.Encrypt ? 4 : undefined} bind:value={input} />
    <input type="submit" onclick={go} value="GO" />
    {#if result}
        <span><b>Copied result: </b> {result}</span>
    {/if}
    </fieldset>
    </div>
    {/if}
    <div class="keyzone">
        <fieldset>
    <KeyPair {keyPair}/>
    <button onclick={reroll}>Reroll</button>
    </fieldset>
</div>
</div>
</div>
<div class={operation === Operation.None ? "window hide" : "window show"} >
    <div class="title-bar">
        <div class="title-bar-text">
            keep it secret
        </div>
    </div>
    <img width="50%" src={ result ? "./secretsafe.jpg" : "./keepyoursecrets.jpeg" } >
</div>
</main>

<style>
    :global(label), :global(input[type="text"]), :global(input[type="password"]) {
        font-size: 14px;
    }
    .hide {
        height: 0;
        width: 0;
        opacity: 0;
      transition: opacity 2s linear;
      -webkit-transition: opacity 2s linear;
      -moz-transition: opacity 2s linear;
      -o-transition: opacity 2s linear;
    }
    .show {
      opacity: 1;
      transition: opacity 2s linear;
      -webkit-transition: opacity 2s linear;
      -moz-transition: opacity 2s linear;
      -o-transition: opacity 2s linear;
    }
</style>
