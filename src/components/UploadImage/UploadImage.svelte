<script>
  import { createEventDispatcher } from 'svelte';
  let dragging = false;
  export let uploadStatus = 'init';
  let label_node;
  export let statusLabels = {};
  $: upload_messages = {
    init: 'Upload Image',
    edit: 'Upload another image',
    uploading: 'Uploading Image...',
    done: 'Image Uploaded!',
    error: 'Error while uploading!',
    ...statusLabels,
  };

  $: upload_text = dragging ? 'Drop Image Here' : upload_messages[uploadStatus];
  $: color = uploadStatus == 'error' ? 'error' : 'accent';

  const dispatch = createEventDispatcher();
  function startDragging() {
    dragging = true;
  }
  function stopDragging() {
    dragging = false;
  }
  const onFile = (getFilesFunction) => (event) => {
    stopDragging();
    uploadStatus = 'edit';
    const files = getFilesFunction(event);
    if (files.length) {
      dispatch('input', { file: files[0] });
    }
  };

  function getFilesFromDropEvent({ dataTransfer: { files, items } }) {
    return files.length
      ? [...files]
      : items.filter(({ kind }) => kind === 'file').map(({ getAsFile }) => getAsFile());
  }

  function getFilesFromInputEvent({ target }) {
    const files = target.files ? [...target.files] : [];
    target.value = '';
    return files;
  }

  function triggerUpload() {
    if (!label_node) return;
    label_node.click();
  }

  function handleKeyDown() {}
</script>

<svelte:window
  on:dragover|preventDefault={startDragging}
  on:dragleave|preventDefault={stopDragging} />

<div class="upload-image--container" on:drop|preventDefault={onFile(getFilesFromDropEvent)}>
  <div
    class="upload-image upload-image--{uploadStatus}"
    on:click={triggerUpload} on:keydown={handleKeyDown}>
    <div class="upload-image--body">
        <label bind:this={label_node}>
          {upload_text}
          <input type="file" on:input={onFile(getFilesFromInputEvent)} />
        </label>
    </div>
  </div>
 
</div>

<style src="./upload-image.scss">
</style>
