<script lang="ts">
    import { SymmetricKey } from "./crypto";

    let { secret = $bindable() }: { secret: SymmetricKey | undefined } = $props();

    function updateSecret(e: Event) {
        secret = new SymmetricKey((e.target! as any).value);
    }
</script>

<div>
    <p>Enter secret here:</p>
    <input type="text" onchange={updateSecret} />
</div>
