<script lang="ts">
    let { image = $bindable(), height, width }: {
        image: HTMLImageElement | undefined,
        height: number,
        width: number,
    } = $props();
    function handleImage(inputEvent: Event) {
        const reader = new FileReader();
        reader.onload = function(readerEvent) {
            const img = new Image();
            img.onload = function () {
                console.log('huh')
                image = img;
            };
            img.src = readerEvent.target!.result as string;
        };
        reader.readAsDataURL((inputEvent.target! as any).files[0]);
    }
</script>
<div id="app">
    <h1>Upload Image</h1>
	<input type="file" onchange={handleImage} />
</div>
